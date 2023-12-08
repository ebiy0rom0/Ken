import { ken } from "../../client/ken.ts"
import { errorCommand } from "../../commands/error.ts";
import { Messages } from "../../config/messages.ts";
import { Interaction } from "../../deps.ts";
import { ChatInputInteractionContext } from "../../structures/commands/chatInputInteractionContext.ts";
import { ComponentInteractionContext } from "../../structures/commands/componentInteractionContext.ts";
import { InteractionContext } from "../../structures/commands/interactionContext.ts";
import { isComponentInteraction } from "../../utils/discord/components.ts";
import { MessageFlags } from "../../utils/discord/message.ts";

export const setInteractionCreate = () => {
  ken.events.interactionCreate = async (_, interaction) => {
    console.log(interaction)
    const ctx = await (isComponentInteraction(interaction) ?
        executeComponentInteraction(interaction)
      : executeChatInputInteraction(interaction))

    // Replying to interactions is required.
    // If you forget to reply, return something.
    await ctx.replyOnce({
      flags: MessageFlags.EPHEMERAL,
      content: Messages.Error.ForgetReply
    })
  }
}

const executeChatInputInteraction = async (interaction: Interaction): Promise<InteractionContext> => {
  const ctx = new ChatInputInteractionContext(interaction)
  const command = ken.commands.get(interaction.data?.name!) ?? errorCommand
  await command?.execute(ctx)
  return ctx
}

const executeComponentInteraction = async (interaction: Interaction): Promise<InteractionContext> => {
  const ctx = new ComponentInteractionContext(interaction)
  const command = ken.commands.get(interaction.data?.customId!) ?? errorCommand
  if (command?.componet) {
    await command?.componet(ctx)
  }
  return ctx
}
