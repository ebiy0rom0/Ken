import { ken } from "../../client/ken.ts";
import { Optionalize, UserToggles } from "../../deps.ts";
import { DiscordUser } from "../types/user.ts";

export function transformUser(payload: DiscordUser) {
  const user = {
    id: ken.transformers.snowflake(payload.id || ""),
    username: payload.username,
    globalName: payload.global_name,
    discriminator: payload.discriminator,
    avatar: payload.avatar ? ken.utils.iconHashToBigInt(payload.avatar) : undefined,
    locale: payload.locale,
    email: payload.email ?? undefined,
    flags: payload.flags,
    premiumType: payload.premium_type,
    publicFlags: payload.public_flags,
    toggles: new UserToggles(payload),
  };

  return user as Optionalize<typeof user>;
}

// deno-lint-ignore no-empty-interface
export interface User extends ReturnType<typeof transformUser> {}
