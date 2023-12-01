
import { ken } from "../../client/ken.ts";
import { Messages } from "../../config/messages.ts";
import { ReminderTypes, createCommand } from "../../utils/mod.ts"

export default createCommand({
  name: "burn-out",
  description: "Stop urging the runner.",

  execute: async ctx => {
    if (!ken.reminders.has(ReminderTypes.BURN)) {
      return
    }

    await ctx.sendReply({ content: Messages.Bonus.Stop })

    ken.reminders.get(ReminderTypes.BURN)?.stop()
    ken.reminders.delete(ReminderTypes.BURN)
  }
})