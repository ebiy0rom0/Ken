import { ken } from "../../client/ken.ts";
import { createCommand } from "../../utils/mod.ts"

export default createCommand({
  name: "employment",
  description: "Shift applications will be closed.",

  execute: async _ctx => await ken.recruiter.stop()
})