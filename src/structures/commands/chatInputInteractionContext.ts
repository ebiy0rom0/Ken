import { ken } from "../../client/ken.ts";
import { InteractionCallbackData, InteractionResponseTypes } from "../../deps.ts";
import { InteractionContext } from "./interactionContext.ts";

export class ChatInputInteractionContext extends InteractionContext {
  replyWithModal = async (options: InteractionCallbackData) => {
    this.replied = true
    await ken.helpers.sendInteractionResponse(this.interaction.id, this.interaction.token, {
      type: InteractionResponseTypes.Modal,
      data: {
        customId: this.interaction.data?.name!,
        ...options
      }
    })
  }
}