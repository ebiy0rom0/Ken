import { ken } from "../../client/ken.ts"
import { Config } from "../../config/config.ts"
import { Messages, T } from "../../config/messages.ts"
import { ApplicationCommandOptionTypes } from "../../deps.ts"
import { Channel } from "../../structures/discord/channel.ts"
import { createCommand, Reminder, ReminderTypes } from "../../utils/mod.ts"

/**
 * /burn command
 *
 * Post messages at intervals specified by interval parameter.
 * [note]
 * This command stops when the bot is restarted.
 *
 * @param {number} interval - notification interval [default: 15 minutes]
 * @param {string} message - remind message [default: env.DEFAULT_BURN_MESSAGE]
 */
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

  execute: async (ctx) => {
    if (ken.reminders.has(ReminderTypes.BURN)) {
      return
    }

    const runner = await ken.guild.member(Config.RUNNER_USER_ID)
    await ctx.reply({ content: T(Messages.Bonus.ManualStart, runner.displayName) })

    const interval = ctx.getOption<number>("interval") ?? 15
    const message = ctx.getOption<string>("message") ?? Config.DEFAULT_BURN_MESSAGE

    const reminder = new Reminder(ReminderTypes.BURN)
    const channel = await Channel.New(Config.LISTEN_ONLY_CHANNEL_ID)
    reminder.start(
      interval * 60 * 1000,
      async () => await channel.send({ content: message }),
    )
  },
})
