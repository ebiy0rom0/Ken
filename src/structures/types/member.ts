import { DiscordMember as OriginalDiscordMember } from "../../deps.ts"
import { DiscordUser } from "./user.ts"

export interface DiscordMember extends OriginalDiscordMember {
  user?: DiscordUser
}

export interface DiscordMemberWithUser extends DiscordMember {
  user: DiscordUser
}
