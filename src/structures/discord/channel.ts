import { ken } from "../../client/ken.ts"
import { Channel as DiscordenoChannel, CreateMessage, ModifyChannel } from "../../deps.ts"

export class Channel {
  private constructor(private ch: DiscordenoChannel) {}

  get id() {
    return this.ch.id
  }
  get name() {
    return this.ch.name!
  }

  static New = async (id: bigint) => {
    const ch = await ken.helpers.getChannel(id)
    return new Channel(ch)
  }

  messages = async () => await ken.helpers.getMessages(this.id)
  send = async (opt: CreateMessage) => await ken.helpers.sendMessage(this.id, opt)
  edit = async (opt: ModifyChannel) => await ken.helpers.editChannel(this.id, opt)
  delete = async (id: bigint) => await ken.helpers.deleteMessage(this.id, id)
}
