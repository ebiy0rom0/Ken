import { ken } from "../../client/ken.ts";
import { Config } from "../../config/config.ts";
import { Messages, T } from "../../config/messages.ts";
import { Channel } from "../../structures/discord/channel.ts";

export const setMessageCreateEvents = () => {
  ken.events.messageCreate = async (_, message) => {
    // ignore bot's message
    if (message.authorId === ken.id) return

    const channel = await Channel.New(message.channelId)
    switch (true) {
      case Boolean(message.content.match(/^[0-9]{5}$/)):
        {
          if (message.channelId !== ken.transformers.snowflake(Config.ROOM_CHANNEL_ID)) break

          await channel.delete(message.id)
          await channel.send({ content: `# ${message.content}` })
          await channel.edit({ name: `【${message.content}】部屋番号` })

          const listenOnlyChannel = await Channel.New(Config.LISTEN_ONLY_CHANNEL_ID)
          listenOnlyChannel.send({ content: T(Messages.Room.Announce, message.content) })
          break
        }
      case Boolean(message.content.match(/えらい/)):
        {
          await channel.send({ content: `ありがとうございます。\nこれからも頑張りますね。` })
          break
        }
    }
  }
}