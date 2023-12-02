import { ken } from "../../client/ken.ts";
import { Interaction, InteractionCallbackData, InteractionResponseTypes } from "../../deps.ts";

export class InteractionContext {
    replied = false
    constructor(protected interaction: Interaction) {}

    get userID () { return this.interaction.user.id }
    get username () { return this.interaction.user.username }

    getOption = <T>(name: string): T | undefined => {
      const options = this.interaction.data?.options ?? []
      return options.find(opt => opt.name === name)?.value as T
    }

    reply = async (options: InteractionCallbackData) => {
      this.replied = true
      await ken.helpers.sendInteractionResponse(this.interaction.id, this.interaction.token, {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: options
      })
    }

    sendDeffer = async (options: InteractionCallbackData) => {
      if (this.replied) return
      await ken.helpers.sendInteractionResponse(this.interaction.id, this.interaction.token, {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: options
      })
    }
  }