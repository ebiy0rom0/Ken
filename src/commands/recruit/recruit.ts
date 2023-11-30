import { honami } from "../../client/honami.ts";
import { createCommand } from "../../utils/mod.ts"

export default createCommand({
  name: "recruit",
  description: "Start the shift recruitment. Performed on a regular daily basis.",

  execute: async _ctx => await honami.recruiter.start()
})