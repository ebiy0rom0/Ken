import { ken } from "../../client/ken.ts";
import { ChannelTypes } from "../../deps.ts"

export class VoiceChannel {
  constructor(private id: bigint) {
    (async () => await this.exists())()
  }

  private exists = async () => {
    if (!(await ken.guild.channels()).has(this.id)) throw Error(`Channel is not exists: ${this.id}`)
    const ch = await ken.helpers.getChannel(this.id)
    if (ch.type !== ChannelTypes.GuildVoice) throw Error(`Invalid channel type: ${this.id}`)
  }

  private participantsCount = async (): Promise<number> => {
    const participations = ken.kv.list<boolean>({ prefix: ["vc", this.id] })
    const count: boolean[] = []
    for await (const entry of participations) {
      count.push(entry.value)
    }
    return count.length
  }
  isFirstParticipant = async () => (await this.participantsCount()) === 1
  isNoParticipant = async () => (await this.participantsCount()) === 0

  isEntered = async (id: bigint) => Boolean((await ken.kv.get(["vc", this.id, id])).value)
  entryMember = async (id: bigint) => await ken.kv.set(["vc", this.id, id], true)
  exitMember = async (id: bigint) => await ken.kv.delete(["vc", this.id, id])
}