import { honami } from "../../client/honami.ts";

export class Guild {
  constructor(private id: bigint) {}

  channels = async () => await honami.helpers.getChannels(this.id)
}

export const guild = new Guild(honami.allowedGuildID)