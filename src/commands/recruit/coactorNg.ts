import { ken } from "../../client/ken.ts";
import { Messages } from "../../config/messages.ts";
import { InteractionTypes, TextStyles } from "../../deps.ts";
import { createActionRow, createInputText } from "../../utils/discord/components.ts";
import { MessageFlags } from "../../utils/discord/message.ts";
import { createCommand } from "../../utils/mod.ts"

export default createCommand({
  name: "coactor-ng",
  description: "Applying for a co-starring NG. This command is not visible to others.",

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

  componet: async ctx => {
    const ng = ctx.getOption<string>("ng")
    await ctx.reply({
      flags: MessageFlags.EPHEMERAL,
      content: Messages.Recruit.NGReport
    })
    InteractionTypes.MessageComponent
    const member = await ken.guild.member(ctx.userID)
    await ken.botChannel.send({ content: `NG:${member.displayName} => ${ng}` })
  }
})