import { Interaction, InteractionTypes } from "../../deps.ts"
import { InteractionContext } from "./interactionContext.ts"

export interface ComponentInteractionContext extends InteractionContext {
  get command(): string
  get content(): string
}

export class ModalInteractionContext extends InteractionContext implements ComponentInteractionContext {
  get command() {
    return this.interaction.data?.customId!
  }
  get content() {
    const row = this.interaction.data?.components?.shift()
    const form = row?.components?.shift()
    return form?.value!
  }
}

export class MessageComponentInteractionContext extends InteractionContext implements ComponentInteractionContext {
  get command() {
    return this.interaction.message?.interaction?.name!
  }
  get content() {
    return this.interaction.data?.customId!
  }
}

export const NewComponentInteractionContext = (
  interaction: Interaction,
): ComponentInteractionContext => {
  switch (interaction.type) {
    case InteractionTypes.MessageComponent:
      return new MessageComponentInteractionContext(interaction)
    case InteractionTypes.ModalSubmit:
      return new ModalInteractionContext(interaction)
  }
  return {} as ComponentInteractionContext
}
