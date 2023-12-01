import { ken } from "../../client/ken.ts"
import { ChatInputInteractionContext } from "../../structures/commands/chatInputInteractionContext.ts";

export const setInteractionCreate = () => {
  ken.events.interactionCreate = async (_, interaction) => {
    const command = ken.commands.get(interaction.data?.name!)
    const ctx = new ChatInputInteractionContext(interaction)
    await command?.execute(ctx)

    if (!ctx.replied) {
      ctx.sendReply({ content: "しゃ～！" })
    }
  }
}