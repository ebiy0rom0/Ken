import { ken } from "../../client/ken.ts";
import { MemberToggles, Optionalize } from "../../deps.ts";
import { DiscordMember } from "../types/mod.ts";
import { transformUser } from "./user.ts";

export function  transformMember(payload: DiscordMember, guildId: bigint, userId: bigint) {
  const member = {
    id: userId,
    guildId,
    user: payload.user ? transformUser(payload.user) : undefined,
    nick: payload.nick ?? undefined,
    roles: payload.roles.map((id) => ken.transformers.snowflake(id)),
    joinedAt: Date.parse(payload.joined_at),
    premiumSince: payload.premium_since ? Date.parse(payload.premium_since) : undefined,
    avatar: payload.avatar ? ken.utils.iconHashToBigInt(payload.avatar) : undefined,
    permissions: payload.permissions ? ken.transformers.snowflake(payload.permissions) : undefined,
    communicationDisabledUntil: payload.communication_disabled_until
    ? Date.parse(payload.communication_disabled_until)
    : undefined,
    toggles: new MemberToggles(payload),
    get displayName () { return this.nick ?? this.user?.globalName ?? "No Name" }
  };

  return member as Optionalize<typeof member>;
}

// deno-lint-ignore no-empty-interface
export interface Member extends ReturnType<typeof transformMember> {}
