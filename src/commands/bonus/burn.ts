import { honami } from "../../client/honami.ts";
import { Channel } from "../../structures/discord/channel.ts";
import { createCommand } from "../../utils/mod.ts"
import { Reminder, ReminderTypes } from "../../utils/reminder.ts";

export default createCommand({
  name: "burn",
  description: "Regularly urge runner to burn live-bonuses.",

  execute: async ctx => {
    if (honami.reminders.has(ReminderTypes.BURN)) {
      return
    }

    await ctx.respondInteraction({ content: "にゃ～～ん！！" })

    const r = new Reminder(ReminderTypes.BURN)
    const ch = new Channel(honami.listenOnlyChannelID)
    r.start(5, async () => await ch.send({ content: "<:emoji_14:1176498845333598269>" }))
    honami.reminders.set(ReminderTypes.BURN, r)
  }
})