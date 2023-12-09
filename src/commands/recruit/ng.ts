import { ken } from "../../client/ken.ts";
import { Messages } from "../../config/messages.ts";
import { InteractionTypes, TextStyles } from "../../deps.ts";
import {
  createActionRow,
  createInputText,
  MessageFlags,
  createCommand
} from "../../utils/mod.ts";

export default createCommand({
  name: "ng",
  description: "共演NGを申告します。入力内容は管理者専用チャンネルに送信されます。",

  execute: async ctx => {
    const ng = createInputText({
      label: "NGの方",
      customId: "ng",
      style: TextStyles.Short,
      required: true
    })
    await ctx.replyWithModal({
      title: "共演NG 提出",
      flags: MessageFlags.EPHEMERAL,
      components: [createActionRow([ng])]
    })
  },

  executeComponent: async ctx => {
    const ng = ctx.content
    await ctx.reply({
      flags: MessageFlags.EPHEMERAL,
      content: Messages.Recruit.NGReport
    })
    InteractionTypes.MessageComponent
    const member = await ken.guild.member(ctx.userID)
    await ken.botChannel.send({ content: `NG:${member.displayName} => ${ng}` })
  }
})