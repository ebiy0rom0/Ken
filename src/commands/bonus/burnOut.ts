
import { honami } from "../../client/honami.ts";
import { Messages } from "../../config/messages.ts";
import { ReminderTypes, createCommand } from "../../utils/mod.ts"

export default createCommand({
  name: "burn-out",
  description: "Stop urging the runner.",

  execute: async ctx => {
    if (!honami.reminders.has(ReminderTypes.BURN)) {
      return
    }

    await ctx.sendReply({ content: Messages.Bonus.Stop })

    honami.reminders.get(ReminderTypes.BURN)?.stop()
    honami.reminders.delete(ReminderTypes.BURN)
  }
})