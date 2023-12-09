import { ken } from "../../client/ken.ts";
import { Messages } from "../../config/messages.ts";
import {
  ApplicationCommandOptionTypes,
  ButtonStyles
} from "../../deps.ts";
import {
  createActionRow,
  createButton,
  createEmbed,
  createCommand
} from "../../utils/mod.ts";

export default createCommand({
  name: "calc-point",
  description: "独りんぼエンヴィーのポイント獲得表を表示します。",
  options: [
    {
      type: ApplicationCommandOptionTypes.Integer,
      name: "points",
      required: true,
      description: "need points",
    }
  ],

  execute: async ctx => {
    await ctx.saveToken()
    const now = 1
    const points = ctx.getOption<number>("points")!
    const combi = await ken.calcurator.findCombination(points)
    const max = Math.ceil(combi.length / 10)
    const message = combi.slice(0,10).map(v =>
      `${String(v.score.toLocaleString())} ~ ${(v.score + 19999).toLocaleString()} (${v.bonus}%)`
    ).join("\r")
    await ctx.reply({
      customId: name,
      content: Messages.Calc.Info,
      embeds: [
        createEmbed({
          title: `🦐🦐 ${points}pt`,
          description: message,
          color: 0xffa500
        })
      ],
      components: [
        createActionRow([
          createButton({
            label: "◀",
            style: ButtonStyles.Primary,
            customId: "left",
            // disabled: now === 1,
          }),
          createButton({
            label: `${now}/${max}`,
            style: ButtonStyles.Secondary,
            customId: "by",
            disabled: true
          }),
          createButton({
            label: "▶",
            style: ButtonStyles.Primary,
            customId: "rignt",
            disabled: now === max
          })
        ])
      ]
    })
  },
  componet: async ctx => {
    const id = await ctx.execComponent()
    ctx.replyOnce({})
    switch (id) {
      case "rignt":
        ctx.editOriginal({ content: "右が押されたのだ" })
        break
      case "left":
        ctx.replyOnce({ content: "左が押されたのだ" })
        break
      default:
        ctx.replyOnce({ content: `${id}が押されたのだ` })
        break
    }
  }
})
