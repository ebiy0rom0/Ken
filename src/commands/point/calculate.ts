import { ken } from "../../client/ken.ts";
import { ApplicationCommandOptionTypes, ButtonStyles } from "../../deps.ts";
import { createActionRow, createButton } from "../../utils/discord/components.ts";
import { createEmbed } from "../../utils/discord/embed.ts";
import { createCommand } from "../../utils/mod.ts";

export default createCommand({
  name: "calc-point",
  description: "Culculate needs bonus and socre range.",
  options: [
    {
      type: ApplicationCommandOptionTypes.Integer,
      name: "points",
      required: true,
      description: "need points",
    }
  ],

  execute: async ctx => {
    const now = 1
    const points = ctx.getOption<number>("points")!
    const combi = await ken.calcurator.findCombination(points)
    const max = Math.ceil(combi.length / 10)
    const message = combi.slice(0,10).map(v => `${String(v.score)} ~ ${v.score + 19999} (${v.bonus}%)`).join("\r")
    await ctx.reply({
      customId: name,
      content: "あんよ、あんよ～...っておい。杏に手を出したら承知しないからな。",
      embeds: [
        createEmbed({
          title: `🦐🦐 ${points}pt 🦐🦐`,
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
            disabled: now === 1
          }),
          createButton({
            label: `1/${max}`,
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
    console.log("hoge")
    await ctx.reply({ content: "update" })
  }
})
