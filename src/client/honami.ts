import { Config } from "../config/config.ts";
import { Intents, createBot } from "../deps.ts";
import { Honami } from "../structures/types/honami.ts";

export const honami = createBot({
  token: Config.DISCORD_TOKEN,
  intents: Intents.Guilds | Intents.GuildMessages | Intents.MessageContent,
}) as Honami
  
  