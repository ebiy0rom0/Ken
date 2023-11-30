import { honami } from "../../client/honami.ts"
import { InteractionContext } from "../../structures/commands/interactionContext.ts";

export const setInteractionCreate = () => {
  honami.events.interactionCreate = async (_, interaction) => {
    const command = honami.commands.get(interaction.data?.name!)
    const ctx = new InteractionContext(interaction)
    await command?.execute(ctx)

    if (!ctx.replied) {
      ctx.respondInteraction({ content: "しゃ～！" })
    }
  }
}