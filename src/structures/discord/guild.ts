import { ken } from "../../client/ken.ts";
import { transformMember } from "../transformers/member.ts";
import { DiscordMemberWithUser } from "../types/member.ts";

export class Guild {
  constructor(private id: bigint) {}
  channels = async () => await ken.helpers.getChannels(this.id)
  members  = async () => await ken.helpers.getMembers(this.id, {})
  member   = async (id: bigint) => {
    const result = await ken.rest.runMethod<DiscordMemberWithUser>(
      ken.rest,
      "GET",
      ken.constants.routes.GUILD_MEMBER(this.id, id),
    );
    console.log(result)

    return await transformMember(result, this.id, id);
  }
}