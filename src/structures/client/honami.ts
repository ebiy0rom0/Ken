import { Collection } from "../../deps.ts";
import { loadCommands } from "../../utils/commands/autoloader.ts";
import { Config } from "../../config/config.ts";
import { honami } from "../../client/honami.ts";

export const setupHonamiMama = async () => {
  honami.kv = await Deno.openKv()
  honami.allowedGuildID = BigInt(Config.ALLOWED_GUILD_ID)
  honami.listenOnlyChannelID = BigInt(Config.BOT_INFO_CHANNEL_ID)
  honami.commands = new Collection()
  honami.reminders = new Collection()
  loadCommands()
}