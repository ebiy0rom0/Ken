import { createCommand } from "../../utils/mod.ts";

export default createCommand({
  name: "topics",
  description: "トークテーマを提供します。1回につき約1円が 雫® の財布から捻出されます。",

  execute: async _ => await 1
})
