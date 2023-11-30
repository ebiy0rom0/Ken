import { startBot } from "./deps.ts"
import { honami } from "./client/honami.ts"
import { setupEvents } from "./events/mod.ts";
import { setupHonamiMama } from "./structures/client/honami.ts";

setupEvents()
setupHonamiMama()

await startBot(honami)