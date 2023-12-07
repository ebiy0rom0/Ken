import { ken } from "../../client/ken.ts";
import { Config } from "../../config/config.ts";
import { VoiceChannel } from "../../structures/discord/voiceChannel.ts";

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
    const vc = await new VoiceChannel(voiceState.channelId! ?? Config.VOICE_CHANNEL_ID)
    if (voiceState.channelId) {
      if (await vc.isEntered(member.id)) return

      vc.entryMember(member.id)
      if (await vc.isFirstParticipant()) {
        ken.botChannel.send({ content: `営業開始 DA☆` })
      }

    } else {
      vc.exitMember(member.id)
      if (await vc.isNoParticipant()) {
        await ken.botChannel.send({ content: `営業終了 DA☆` })
      }
    }
  }
}