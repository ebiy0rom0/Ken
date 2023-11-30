import { honami } from "../../client/honami.ts";
import { Interaction, InteractionCallbackData, InteractionResponseTypes } from "../../deps.ts";

export class InteractionContext {
  replied = false
  constructor(private interaction: Interaction) {}

  respondInteraction = async (options: InteractionCallbackData) => {
    this.replied = true
    await honami.helpers.sendInteractionResponse(this.interaction.id, this.interaction.token, {
      type: InteractionResponseTypes.ChannelMessageWithSource,
      data: options
    })
  }
}