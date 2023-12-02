import { InteractionContext } from "./interactionContext.ts";

export class ComponentInteractionContext extends InteractionContext {
  getOption = <T>(name: string): T | undefined => {
    const row = this.interaction.data?.components?.shift()
    return row?.components?.find(component => component.customId = name)?.value as T
  }
}