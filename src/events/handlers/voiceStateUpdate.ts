import { ken } from "../../client/ken.ts";
import { Config } from "../../config/config.ts";
import { Channel } from "../../structures/discord/channel.ts";
import { VoiceChannel } from "../../structures/discord/voiceChannel.ts";
import { Reminder, ReminderTypes } from "../../utils/mod.ts";

export const setVoiceStateUpdate = () => {
  ken.events.voiceStateUpdate = async (_, voiceState) => {
    const member = await ken.guild.member(voiceState.userId)
    // ignore bot state update
    if (member.user?.toggles.bot) return

    // only work with default voice channel
    if (
      voiceState.channelId
      && voiceState.channelId !== ken.transformers.snowflake(Config.VOICE_CHANNEL_ID)
    ) return

    // If member exit the voice channel, use the default channel ID
    // because the channel ID is empty in voice state.
    const vc = new VoiceChannel(voiceState.channelId! ?? ken.transformers.snowflake(Config.VOICE_CHANNEL_ID))
    if (voiceState.channelId) {
      if (await vc.isEntered(member.id)) return

      await vc.entry(member.id)
      if (await vc.isFirstEntry()) {
        await ken.botChannel.send({ content: `炊き忘れ防止リマインダー 起動` })

        const reminder = new Reminder(ReminderTypes.BURN)
        const channel  = new Channel(ken.transformers.snowflake(Config.LISTEN_ONLY_CHANNEL_ID))
        reminder.start(
          5 * 1000,
          async () => await channel.send({ content: "<:emoji_14:1176498845333598269>" })
        )
      }

    } else {
      await vc.exit(member.id)
      if (await vc.isEmpty()) {
        await ken.botChannel.send({ content: `炊き忘れ防止リマインダー 停止` })
        ken.reminders.get(ReminderTypes.BURN)?.stop()
      }
    }
  }
}