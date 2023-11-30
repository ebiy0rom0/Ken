import { honami } from "../../client/honami.ts"
import { ChatInputInteractionContext } from "../../structures/commands/chatInputInteractionContext.ts";

export const setInteractionCreate = () => {
  honami.events.interactionCreate = async (_, interaction) => {
    const command = honami.commands.get(interaction.data?.name!)
    const ctx = new ChatInputInteractionContext(interaction)
    await command?.execute(ctx)

    if (!ctx.replied) {
      ctx.sendReply({ content: "しゃ～！" })
    }
  }
}