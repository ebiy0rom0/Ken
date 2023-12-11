import { ken } from "../../client/ken.ts";
import { Config } from "../../config/config.ts";
import { Messages } from "../../config/messages.ts";
import { TextStyles } from "../../deps.ts";
import { Channel } from "../../structures/discord/channel.ts";
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
    await ctx.reply({
      flags: MessageFlags.EPHEMERAL,
      content: Messages.Recruit.NGReport
    })

    const member = await ken.guild.member(ctx.userID)
    const ch = new Channel(Config.NG_COLLECT_CHANNEL_ID)
    await ch.send({ content: `${member.displayName}\r${ctx.content}` })
  }
})