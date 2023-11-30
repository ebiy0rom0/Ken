import { honami } from "../../client/honami.ts";

export class Guild {
  constructor(private id: bigint) {}

  channels = async () => await honami.helpers.getChannels(this.id)
  member   = async (id: bigint) => await honami.helpers.getMember(this.id, id)
}