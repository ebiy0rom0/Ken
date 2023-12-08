import { dotenv } from "../deps.ts"

dotenv.loadSync({ export: true })

export const Config = {
  DISCORD_TOKEN:          Deno.env.get("DISCORD_TOKEN")!,
  OPENAI_API_KEY:         Deno.env.get("OPENAI_API_KEY")!,
  ALLOWED_GUILD_ID:       Deno.env.get("ALLOWED_GUILD_ID")!,
  VOICE_CHANNEL_ID:       Deno.env.get("VOICE_CHANNEL_ID")!,
  ROOM_CHANNEL_ID:        Deno.env.get("ROOM_CHANNEL_ID")!,
  LISTEN_ONLY_CHANNEL_ID: Deno.env.get("LISTEN_ONLY_CHANNEL_ID")!,
  BOT_INFO_CHANNEL_ID:    Deno.env.get("BOT_INFO_CHANNEL_ID")!,
  RUNNER_USER_ID:         Deno.env.get("RUNNER_USER_ID")!,
}