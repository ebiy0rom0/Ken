import { ActionRow, ButtonComponent, InputTextComponent, Interaction, InteractionTypes, MessageComponentTypes } from "../../deps.ts";

type OptionalProperty<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export const isComponentInteraction = (interaction: Interaction): boolean =>
  interaction.type === InteractionTypes.MessageComponent || interaction.type === InteractionTypes.ModalSubmit

export const createActionRow = (components: ActionRow["components"]): ActionRow => ({
  type: MessageComponentTypes.ActionRow,
  components
})

export const createInputText = (
  component: OptionalProperty<InputTextComponent, "type">
): InputTextComponent => ({
  ...component,
  type: MessageComponentTypes.InputText
})

export const createButton = (
  component: OptionalProperty<ButtonComponent, "type">
): ButtonComponent => ({
  ...component,
  type: MessageComponentTypes.Button
})