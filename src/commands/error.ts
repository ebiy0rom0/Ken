import { Messages } from "../config/messages.ts"
import { createCommand } from "../utils/mod.ts"

export const errorCommand = createCommand({
  name: "error",
  description: "common error interaction responder.",

  execute: async (ctx) => await ctx.reply({ content: Messages.Error.CommandNotExists }),
  executeComponent: async (ctx) => await ctx.reply({ content: Messages.Error.CommandNotExists }),
})
