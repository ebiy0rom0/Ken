import { ken } from "../../client/ken.ts"
import { Messages } from "../../config/messages.ts"
import { createCommand, ReminderTypes } from "../../utils/mod.ts"

export default createCommand({
  name: "burn-out",
  description: "炊き忘れ防止リマインダーを停止します。【ランナー用】",

  execute: async (ctx) => {
    if (!ken.reminders.has(ReminderTypes.BURN)) {
      return
    }
    await ctx.reply({ content: Messages.Bonus.ManualStop })

    ken.reminders.get(ReminderTypes.BURN)?.stop()
  },
})
