import { ken } from "../../client/ken.ts";
import { Config } from "../../config/config.ts";
import { Messages, T } from "../../config/messages.ts";
import { ApplicationCommandOptionTypes } from "../../deps.ts";
import { Channel } from "../../structures/discord/channel.ts";
import { createCommand, Reminder, ReminderTypes } from "../../utils/mod.ts"

export default createCommand({
  name: "burn",
  description: "炊き忘れ防止リマインダーを起動します。【ランナー用】",
  options: [{
    type: ApplicationCommandOptionTypes.Integer,
    name: "interval",
    description: "通知間隔(分)[デフォルト: 15分]",
  }, {
    type: ApplicationCommandOptionTypes.String,
    name: "message",
    description: "リマインドメッセージ",
  }],

  execute: async ctx => {
    if (ken.reminders.has(ReminderTypes.BURN)) {
      return
    }

    await ctx.reply({ content: T(Messages.Bonus.ManualStart, "ブリジットたん") }) // FIXME: using member's global name?


    const interval = ctx.getOption<number>("interval") ?? 15
    const message  = ctx.getOption<string>("message") ?? Config.DEFAULT_BURN_MESSAGE

    const reminder = new Reminder(ReminderTypes.BURN)
    const channel  = new Channel(Config.LISTEN_ONLY_CHANNEL_ID)
    reminder.start(
      interval * 60 * 1000,
      async () => await channel.send({ content: message })
    )
  }
})