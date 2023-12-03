import { ken } from "../../client/ken.ts";
import { Collection } from "../../deps.ts";
import { transformMember } from "../transformers/member.ts";
import { DiscordMemberWithUser } from "../types/mod.ts";

export class Guild {
  constructor(private id: bigint) {}
  channels = async () => await ken.helpers.getChannels(this.id)
  members = async () => {
    const results = await ken.rest.runMethod<DiscordMemberWithUser[]>(
      ken.rest,
      "GET",
      ken.constants.routes.GUILD_MEMBERS(this.id, {}),
    )

    return new Collection(
      results.map(result => {
        const member = transformMember(result, this.id, ken.transformers.snowflake(result.user.id))
        return [member.id, member];
      }),
    )
  }
  member = async (id: bigint) => {
    const result = await ken.rest.runMethod<DiscordMemberWithUser>(
      ken.rest,
      "GET",
      ken.constants.routes.GUILD_MEMBER(this.id, id),
    )
    return await transformMember(result, this.id, id)
  }
}