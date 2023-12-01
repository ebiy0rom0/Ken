import { Config } from "../config/config.ts";
import { Intents, createBot } from "../deps.ts";
import { Ken } from "../structures/types/ken.ts";

export const ken = createBot({
  token: Config.DISCORD_TOKEN,
  intents: Intents.Guilds | Intents.GuildMessages | Intents.MessageContent,
}) as Ken
