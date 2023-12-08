import { ken } from "../../client/ken.ts";
import { Config } from "../../config/config.ts";
import { Messages, T } from "../../config/messages.ts";
import { ApplicationCommandOptionTypes } from "../../deps.ts";
import { Channel } from "../../structures/discord/channel.ts";
import { createCommand } from "../../utils/mod.ts"
import { Reminder, ReminderTypes } from "../../utils/reminder.ts";

export default createCommand({
  name: "burn",
  description: "【ランナー用】炊き忘れ防止リマインダーを起動します。",
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

    await ctx.reply({ content: T(Messages.Bonus.Start, "りはびり") }) // FIXME: using member's global name?


    const interval = ctx.getOption<number>("interval") ?? 15
    const message  = ctx.getOption<string>("message") ?? Config.DEFAULT_BURN_MESSAGE

    const reminder = new Reminder(ReminderTypes.BURN)
    const channel  = new Channel(ken.transformers.snowflake(Config.LISTEN_ONLY_CHANNEL_ID))
    reminder.start(
      interval * 60 * 1000,
      async () => await channel.send({ content: message })
    )
  }
})