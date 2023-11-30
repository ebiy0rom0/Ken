import { createCommand } from "../../utils/mod.ts"

export default createCommand({
  name: "recruit",
  description: "Start the shift recruitment. Performed on a regular daily basis.",

  execute: async _ => await 1
})