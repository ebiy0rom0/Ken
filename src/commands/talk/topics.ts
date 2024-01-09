import { Messages } from "../../config/messages.ts"
import { createCommand } from "../../utils/mod.ts"

export default createCommand({
  name: "topics",
  description: "トークテーマを提供します。1回につき約1円が 雫® の財布から捻出されます。",

  execute: async (ctx) => await ctx.reply({ content: Messages.Error.RequestTopics }),
})
