import { ken } from "../../client/ken.ts"
import { errorCommand } from "../../commands/error.ts";
import { Messages } from "../../config/messages.ts";
import { BitwisePermissionFlags, calculatePermissions, Interaction } from "../../deps.ts";
import { ChatInputInteractionContext } from "../../structures/commands/chatInputInteractionContext.ts";
import { NewComponentInteractionContext } from "../../structures/commands/componentInteractionContext.ts";
import { InteractionContext } from "../../structures/commands/interactionContext.ts";
import { isComponentInteraction, MessageFlags } from "../../utils/mod.ts";

export const setInteractionCreate = () => {
  ken.events.interactionCreate = async (_, interaction) => {
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
  const command = ken.commands.get(ctx.command) ?? errorCommand

  if (
    command.needParmBits &&
    !command.needParmBits.every(bit =>
      calculatePermissions(
        interaction.member?.permissions!
      ).some(p => BitwisePermissionFlags[p] & bit)
  )) {
    await ctx.reply({
      flags: MessageFlags.EPHEMERAL,
      content: Messages.Error.PermissionDenied
    })

  } else {
    await command?.execute(ctx)
  }

  return ctx
}

const executeComponentInteraction = async (interaction: Interaction): Promise<InteractionContext> => {
  const ctx = NewComponentInteractionContext(interaction)

  const command = ken.commands.get(ctx.command) ?? errorCommand
  if (command?.executeComponent) {
    await command?.executeComponent(ctx)
  }
  return ctx
}
