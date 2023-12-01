import { Interaction, InteractionTypes } from "../../deps.ts";

export class ComponentInteractionContext {
  constructor(private interaction: Interaction) {}

  hoge = () => {
    const type = this.interaction.type & InteractionTypes.MessageComponent
  }
}