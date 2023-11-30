import { honami } from "../../client/honami.ts";
import { Messages } from "../../config/messages.ts";
import { ApplicationCommandOptionTypes } from "../../deps.ts";
import { Channel } from "../../structures/discord/channel.ts";
import { createCommand } from "../../utils/mod.ts"
import { Reminder, ReminderTypes } from "../../utils/reminder.ts";

export default createCommand({
  name: "burn",
  description: "Regularly urge runner to burn live-bonuses.",
  options: [
    {
      type: ApplicationCommandOptionTypes.Integer,
      name: "interval",
      description: "notification interval(in minutes)",
    }
  ],

  execute: async ctx => {
    if (honami.reminders.has(ReminderTypes.BURN)) {
      return
    }

    await ctx.sendReply({ content: Messages.Bonus.Start })

    const interval = ctx.getOption<number>("interval") ?? 15
    const reminder = new Reminder(ReminderTypes.BURN)
    const channel = new Channel(honami.listenOnlyChannelID)
    reminder.start(
      interval * 1000,
      async () => await channel.send({ content: "<:emoji_14:1176498845333598269>" })
    )
    honami.reminders.set(ReminderTypes.BURN, reminder)
  }
})