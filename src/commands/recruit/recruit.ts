import { ken } from "../../client/ken.ts";
import { createCommand } from "../../utils/mod.ts"

export default createCommand({
  name: "recruit",
  description: "シフト募集を開始します。【管理者用】",

  execute: async _ctx => await ken.recruiter.start()
})