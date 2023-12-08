import { ken } from "../../client/ken.ts";
import { createCommand } from "../../utils/mod.ts"

export default createCommand({
  name: "recruit",
  description: "【管理者用】シフト募集を開始します。",

  execute: async _ctx => await ken.recruiter.start()
})