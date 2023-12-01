import { ken } from "../../client/ken.ts";

export class Guild {
  constructor(private id: bigint) {}

  channels = async () => await ken.helpers.getChannels(this.id)
  member   = async (id: bigint) => await ken.helpers.getMember(this.id, id)
}