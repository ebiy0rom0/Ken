import { ken } from "../../client/ken.ts";
import { ApplicationCommandOptionTypes } from "../../deps.ts";
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
    const points = ctx.getOption<number>("points")!
    const combi = await ken.calcurator.findCombination(points)
    const message = combi.map(v => `${v.score}~${v.score + 19999}(${v.bonus}%)`).join(",")
    await ken.botChannel.send({ content: `\`${message}\`` })
  }
})