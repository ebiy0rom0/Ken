import "./config/load.ts"
import { startBot } from "./deps.ts"
import { ken } from "./client/ken.ts"
import { setupEvents } from "./events/mod.ts"
import { setupKen } from "./structures/client/ken.ts"

try {
  setupEvents()
  setupKen()

  await startBot(ken)
} catch (e) {
  console.log(e)
}
