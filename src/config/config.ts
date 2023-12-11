import { ken } from "../client/ken.ts";
import { dotenv } from "../deps.ts"

dotenv.loadSync({
  export: true,
  allowEmptyValues: true
})

export const Config = {
  ALLOWED_GUILD_ID:       ken.transformers.snowflake(Deno.env.get("ALLOWED_GUILD_ID")!),
  VOICE_CHANNEL_ID:       ken.transformers.snowflake(Deno.env.get("VOICE_CHANNEL_ID")!),
  ROOM_CHANNEL_ID:        ken.transformers.snowflake(Deno.env.get("ROOM_CHANNEL_ID")!),
  LISTEN_ONLY_CHANNEL_ID: ken.transformers.snowflake(Deno.env.get("LISTEN_ONLY_CHANNEL_ID")!),
  BOT_INFO_CHANNEL_ID:    ken.transformers.snowflake(Deno.env.get("BOT_INFO_CHANNEL_ID")!),
  NG_COLLECT_CHANNEL_ID:  ken.transformers.snowflake(Deno.env.get("NG_COLLECT_CHANNEL_ID")!),
  RUNNER_USER_ID:         ken.transformers.snowflake(Deno.env.get("RUNNER_USER_ID")!),
  SUPPORTER_ROLE_ID:      ken.transformers.snowflake(Deno.env.get("SUPPORTER_ROLE_ID")!),
  DEFAULT_BURN_MESSAGE:   Deno.env.get("DEFAULT_BURN_MESSAGE")!,
}