import { ken } from "../../client/ken.ts";
import { createCommand } from "../../utils/mod.ts"

export default createCommand({
  name: "employment",
  description: "シフト募集を終了します。【管理者用】",

  execute: async _ctx => await ken.recruiter.stop()
})