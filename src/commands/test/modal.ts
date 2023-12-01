import { TextStyles } from "../../deps.ts";
import { createActionRow, createInputText } from "../../utils/discord/components.ts";
import { createCommand } from "../../utils/mod.ts";

export default createCommand({
  name: "test",
  description: "modal open interaction test",

  execute: async ctx => {
    const message = createInputText({
      label: "test",
      customId: "TEXT",
      style: TextStyles.Paragraph,
    })
    await ctx.sendReply({
      title: "test",
      components: [createActionRow([message])]})
  }
})

// interface InputTextComponent {
//   /** InputText Component is of type 4 */
//   type: MessageComponentTypes.InputText;
//   /** The style of the InputText */
//   style: TextStyles;
//   /** The customId of the InputText */
//   customId: string;
//   /** The label of the InputText. Maximum 45 characters */
//   label: string;
//   /** The placeholder of the InputText */
//   placeholder?: string;
//   /** The minimum length of the text the user has to provide */
//   minLength?: number;
//   /** The maximum length of the text the user has to provide */
//   maxLength?: number;
//   /** Whether or not this input is required. */
//   required?: boolean;
//   /** Pre-filled value for input text. */
//   value?: string;
// }