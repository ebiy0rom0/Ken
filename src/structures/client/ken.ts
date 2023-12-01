import { Collection } from "../../deps.ts";
import { loadCommands } from "../../utils/commands/autoloader.ts";
import { Config } from "../../config/config.ts";
import { ken } from "../../client/ken.ts";
import { Guild } from "../discord/guild.ts";
import { Channel } from "../discord/channel.ts";
import { ShiftRecruiter } from "../../utils/shiftRecruiter.ts";

export const setupKen = async () => {
  ken.kv = await Deno.openKv()
  ken.guild = new Guild(BigInt(Config.ALLOWED_GUILD_ID))
  ken.botChannel = new Channel(BigInt(Config.BOT_INFO_CHANNEL_ID))
  ken.listenOnlyChannelID = BigInt(Config.BOT_INFO_CHANNEL_ID)
  ken.commands = new Collection()
  ken.reminders = new Collection()
  ken.recruiter = new ShiftRecruiter()
  loadCommands()
}