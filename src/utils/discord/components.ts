import { ActionRow, InputTextComponent, MessageComponentTypes } from "../../deps.ts";

type OptionalProperty<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

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