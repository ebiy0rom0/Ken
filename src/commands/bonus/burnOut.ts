
import { ken } from "../../client/ken.ts";
import { Messages } from "../../config/messages.ts";
import { ReminderTypes, createCommand } from "../../utils/mod.ts"

export default createCommand({
  name: "burn-out",
  description: "【ランナー用】炊き忘れ防止リマインダーを停止します。",

  execute: async ctx => {
    if (!ken.reminders.has(ReminderTypes.BURN)) {
      return
    }
    await ctx.reply({ content: Messages.Bonus.Stop })

    ken.reminders.get(ReminderTypes.BURN)?.stop()
  }
})