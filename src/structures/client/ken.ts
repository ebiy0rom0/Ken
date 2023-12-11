import { Collection } from "../../deps.ts";
import { ken } from "../../client/ken.ts";
import { Config } from "../../config/config.ts";
import { Guild } from "../discord/guild.ts";
import { Channel } from "../discord/channel.ts";
import {
  loadCommands,
  Recruiter,
  PointCalculator
} from "../../utils/mod.ts";

export const setupKen = async () => {
  ken.kv         = await Deno.openKv()
  ken.guild      = new Guild(Config.ALLOWED_GUILD_ID)
  ken.botChannel = new Channel(Config.BOT_INFO_CHANNEL_ID)
  ken.commands   = new Collection()
  ken.reminders  = new Collection()
  ken.recruiter  = new Recruiter()
  ken.calcurator = new PointCalculator()
  loadCommands()
}