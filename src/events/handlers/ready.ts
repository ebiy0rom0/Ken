import { ken } from "../../client/ken.ts"

export const setReadyEvents = () => {
  ken.events.ready = async (_, payload) => {
    console.log(`${await payload.user.username} is ready!`)
  }
}
