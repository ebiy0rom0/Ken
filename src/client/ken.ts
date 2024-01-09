import { createBot, Intents } from "../deps.ts"
import { Ken } from "../structures/types/mod.ts"

export const ken = createBot({
  token: Deno.env.get("DISCORD_TOKEN")!,
  intents: Intents.Guilds | Intents.GuildMessages | Intents.MessageContent |
    Intents.GuildVoiceStates,
}) as Ken
