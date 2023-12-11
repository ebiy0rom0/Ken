import { ken } from "../../client/ken.ts";
import { Messages } from "../../config/messages.ts";
import { createCommand } from "../../utils/mod.ts"

export default createCommand({
  name: "recruit",
  description: "シフト募集を開始します。【管理者用】",

  execute: async ctx => {
    await ctx.reply({ content: Messages.Recruit.Start })
    await ken.recruiter.start()
  }
})