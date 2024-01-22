import { ken } from "../../client/ken.ts"
import { Messages } from "../../config/messages.ts"
import { ActionRow, ApplicationCommandOptionTypes, ButtonStyles } from "../../deps.ts"
import { createActionRow, createButton, createCommand, createEmbed } from "../../utils/mod.ts"

const CONTENTS_LIMIT = 10

/**
 * /calc-point command
 *
 * Displays the score/bonus combinations that will earn you
 * the points specified in "Hitorinbo Envy".
 *
 * @param {number} points - number of points earned
 */
export default createCommand({
  name: "calc-point",
  description: "独りんぼエンヴィーのポイント獲得表を表示します。",
  options: [
    {
      type: ApplicationCommandOptionTypes.Integer,
      name: "points",
      required: true,
      description: "need points",
    },
  ],

  execute: async (ctx) => {
    await ctx.saveToken(name, 30000)
    const points = ctx.getOption<number>("points")!
    const combi = await ken.calcurator.findCombination(points)
    await ctx.reply({
      customId: name,
      content: Messages.Calc.Info,
      embeds: [
        createEmbed({
          title: `🦐🦐 ${points}pt`,
          description: generateMessage(combi, CONTENTS_LIMIT, 0),
          color: 0xffa500,
        }),
      ],
      components: [createPager(combi, CONTENTS_LIMIT, 1, points)],
    })
  },
  executeComponent: async (ctx) => {
    ctx.replyOnce({}) // empty reply
    const [, now, pt] = parseCustomID(await ctx.content)
    const combination = await ken.calcurator.findCombination(+pt)

    ctx.editOriginalResponse(name, {
      customId: name,
      content: Messages.Calc.Info,
      embeds: [
        createEmbed({
          title: `🦐🦐 ${pt}pt`,
          description: generateMessage(combination, CONTENTS_LIMIT, (+now - 1) * 10),
          color: 0xffa500,
        }),
      ],
      components: [createPager(combination, CONTENTS_LIMIT, +now, +pt)],
    })
  },
})

const generateMessage = (
  contents: ReturnType<typeof ken.calcurator.findCombination> extends Promise<infer U> ? U : never,
  limit: number,
  offset: number,
) =>
  contents.slice(offset, offset + limit).map((v) =>
    `${String(v.score.toLocaleString())} ~ ${(v.score + 19999).toLocaleString()} (${v.bonus}%)`
  ).join("\r")

const generateCustomID = (id: string, ...value: (number | string)[]): string => `${id}:${value.join(":")}`

const parseCustomID = (customID: string): [string, ...string[]] => {
  const [id, ...values] = customID.split(":")
  return [id, ...values]
}

const createPager = (
  contents: unknown[],
  limit: number,
  now: number,
  pt: number,
): ActionRow => {
  const max = Math.ceil(contents.length / limit)
  return createActionRow([
    createButton({
      label: "<",
      style: ButtonStyles.Primary,
      customId: generateCustomID("right", now - 1, pt),
      disabled: now === 1,
    }),
    createButton({
      label: `${now}/${max}`,
      style: ButtonStyles.Secondary,
      customId: "page",
      disabled: true,
    }),
    createButton({
      label: ">",
      style: ButtonStyles.Primary,
      customId: generateCustomID("right", now + 1, pt),
      disabled: now === max,
    }),
  ])
}
