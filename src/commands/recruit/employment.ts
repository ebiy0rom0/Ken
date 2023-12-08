import { ken } from "../../client/ken.ts";
import { createCommand } from "../../utils/mod.ts"

export default createCommand({
  name: "employment",
  description: "【管理者用】シフト募集を終了します。",

  execute: async _ctx => await ken.recruiter.stop()
})