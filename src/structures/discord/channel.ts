import { honami } from "../../client/honami.ts";
import { CreateMessage, ModifyChannel } from "../../deps.ts"

export class Channel {
  constructor(private id: bigint) {
    this.exists()
  }

  private exists = async () => {
    if (!(await honami.guild.channels()).has(this.id)) throw Error(`Channel is not exists: ${this.id}`)
  }

  messages = async () => await honami.helpers.getMessages(this.id)
  send = async (opt: CreateMessage) => await honami.helpers.sendMessage(this.id, opt)
  edit = async (opt: ModifyChannel) => await honami.helpers.editChannel(this.id, opt)
  delete = async (id: bigint) => await honami.helpers.deleteMessage(this.id, id)
}