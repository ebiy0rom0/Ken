import { ken } from "../../client/ken.ts";
import { Messages } from "../../config/messages.ts";
import { createCommand } from "../../utils/mod.ts"

export default createCommand({
  name: "employment",
  description: "シフト募集を終了します。【管理者用】",

  execute: async ctx => {
    await ctx.reply({ content: Messages.Recruit.Stop })
    await ken.recruiter.stop()
  }
})