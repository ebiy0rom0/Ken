import { Collection } from "../../deps.ts";
import { loadCommands } from "../../utils/commands/autoloader.ts";
import { Config } from "../../config/config.ts";
import { honami } from "../../client/honami.ts";
import { Guild } from "../discord/guild.ts";
import { Channel } from "../discord/channel.ts";
import { ShiftRecruiter } from "../../utils/shiftRecruiter.ts";

export const setupHonamiMama = async () => {
  honami.kv = await Deno.openKv()
  honami.guild = new Guild(BigInt(Config.ALLOWED_GUILD_ID))
  honami.botChannel = new Channel(BigInt(Config.BOT_INFO_CHANNEL_ID))
  honami.listenOnlyChannelID = BigInt(Config.BOT_INFO_CHANNEL_ID)
  honami.commands = new Collection()
  honami.reminders = new Collection()
  honami.recruiter = new ShiftRecruiter()
  loadCommands()
}