import { honami } from "../../client/honami.ts";
import { createCommand } from "../../utils/mod.ts"

export default createCommand({
  name: "employment",
  description: "Shift applications will be closed.",

  execute: async _ctx => await honami.recruiter.stop()
})