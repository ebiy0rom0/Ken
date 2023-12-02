import { createCommand } from "../utils/mod.ts"

export const errorCommand = createCommand({
  name: "error",
  description: "common error interaction responder.",

  execute: async ctx => await ctx.reply({ content: "すまない、丁度在庫を切らしてるんだ。" })
})