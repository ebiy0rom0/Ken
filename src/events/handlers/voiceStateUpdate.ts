import { ken } from "../../client/ken.ts";
import { Channel } from "../../structures/discord/channel.ts";

export const setVoiceStateUpdate = () => {
  ken.events.voiceStateUpdate = async (_, voiceState) => {
    const member = await ken.guild.member(voiceState.userId)
    if (member.user?.toggles.bot) {
      return
    }
    const vc = new Channel(voiceState.channelId ?? ken.voiceChannelID)
    if (voiceState.channelId) {
      ken.botChannel.send({ content: `よく来たな、${member.user?.globalName}` })
      ken.kv.set(["vc", member.id], true)  // value can be anything

      if (await vc.isFirstParticipant()) {
        ken.botChannel.send({ content: `営業開始 DA☆` })
      }
    } else {
      ken.botChannel.send({ content: `じゃあな、${member.user?.globalName}` })
      ken.kv.delete(["vc", member.id])

      if (await vc.isNoParticipant()) {
        await ken.botChannel.send({ content: `営業終了 DA☆` })
      }
    }
  }
}