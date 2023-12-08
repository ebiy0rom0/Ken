import { Collection } from "../../deps.ts";
import { loadCommands } from "../../utils/commands/autoloader.ts";
import { Config } from "../../config/config.ts";
import { ken } from "../../client/ken.ts";
import { Guild } from "../discord/guild.ts";
import { Channel } from "../discord/channel.ts";
import { Recruiter } from "../../utils/recruiter.ts";
import { PointCalculator } from "../../utils/pointCalculator.ts";

export const setupKen = async () => {
  ken.kv         = await Deno.openKv()
  ken.guild      = new Guild(ken.transformers.snowflake(Config.ALLOWED_GUILD_ID))
  ken.botChannel = new Channel(ken.transformers.snowflake(Config.BOT_INFO_CHANNEL_ID))
  ken.commands   = new Collection()
  ken.reminders  = new Collection()
  ken.recruiter  = new Recruiter()
  ken.calcurator = new PointCalculator()
  loadCommands()
}