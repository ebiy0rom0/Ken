import { ken } from "../../client/ken.ts";
import { Interaction, InteractionCallbackData, InteractionResponseTypes } from "../../deps.ts";

export class ChatInputInteractionContext {
  replied = false
  constructor(private interaction: Interaction) {}

  getOption = <T>(name: string): T | undefined => {
    const options = this.interaction.data?.options ?? []
    console.log(options.find(opt => opt.name === name))
    return options.find(opt => opt.name === name)?.value as T
  }

  sendReply = async (options: InteractionCallbackData) => {
    this.replied = true
    await ken.helpers.sendInteractionResponse(this.interaction.id, this.interaction.token, {
      type: InteractionResponseTypes.ChannelMessageWithSource,
      data: options
    })
  }
}