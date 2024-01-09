import { DiscordUser as OriginalDiscordUser } from "../../deps.ts"

export interface DiscordUser extends OriginalDiscordUser {
  global_name: string
}
