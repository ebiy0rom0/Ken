import { setInteractionCreate } from "./handlers/interactionCreate.ts"
import { setMessageCreateEvents } from "./handlers/messageCreate.ts"
import { setReadyEvents } from "./handlers/ready.ts"
import { setVoiceStateUpdate } from "./handlers/voiceStateUpdate.ts"

export const setupEvents = () => {
  setInteractionCreate()
  setMessageCreateEvents()
  setReadyEvents()
  setVoiceStateUpdate()
}
