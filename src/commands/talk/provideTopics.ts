import { createCommand } from "../../utils/mod.ts";

export default createCommand({
  name: "provide-topics",
  description: "Talk topics will be provided.",

  execute: async _ => await 1
})
