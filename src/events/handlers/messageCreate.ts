import { ken } from "../../client/ken.ts";
import { Channel } from "../../structures/discord/channel.ts";

export const setMessageCreateEvents = () => {
  ken.events.messageCreate = async (_, message) => {
    // ignore bot's message
    if (message.authorId === ken.id) return

    const channel = new Channel(message.channelId)
    switch (true) {
      case Boolean(message.content.match(/^[0-9]{5}$/)):
        {
          if (message.channelId !== ken.roomChannelID) break

          await channel.delete(message.id)
          await channel.send({ content: `# ${message.content}` })
          await channel.edit({ name: `【${message.content}】部屋番号` })
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