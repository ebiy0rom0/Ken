import { createCommand } from "../../utils/mod.ts"

export default createCommand({
  name: "employment",
  description: "Shift applications will be closed.",

  execute: async _ => await 1
})