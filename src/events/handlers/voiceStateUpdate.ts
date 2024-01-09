import { ken } from "../../client/ken.ts"
import { Config } from "../../config/config.ts"
import { Messages } from "../../config/messages.ts"
import { Channel } from "../../structures/discord/channel.ts"
import { VoiceChannel } from "../../structures/discord/voiceChannel.ts"
import { Reminder, ReminderTypes } from "../../utils/mod.ts"

export const setVoiceStateUpdate = () => {
  ken.events.voiceStateUpdate = async (_, voiceState) => {
    const member = await ken.guild.member(voiceState.userId)
    // ignore bot state update
    if (member.user?.toggles.bot) return

    // only work with default voice channel
    if (
      voiceState.channelId &&
      voiceState.channelId !== Config.VOICE_CHANNEL_ID
    ) return

    // If member exit the voice channel, use the default channel ID
    // because the channel ID is empty in voice state.
    const vc = new VoiceChannel(voiceState.channelId! ?? Config.VOICE_CHANNEL_ID)
    if (voiceState.channelId) {
      if (await vc.isEntered(member.id)) return

      await vc.entry(member.id)
      if (await vc.isFirstEntry()) {
        await ken.botChannel.send({ content: Messages.Bonus.AutoStart })

        const reminder = new Reminder(ReminderTypes.BURN)
        const channel = await Channel.New(Config.LISTEN_ONLY_CHANNEL_ID)
        reminder.start(
          5 * 1000,
          async () => await channel.send({ content: Config.DEFAULT_BURN_MESSAGE }),
        )
      }
    } else {
      await vc.exit(member.id)
      if (await vc.isEmpty()) {
        await ken.botChannel.send({ content: Messages.Bonus.AutoStop })
        ken.reminders.get(ReminderTypes.BURN)?.stop()
      }
    }
  }
}
