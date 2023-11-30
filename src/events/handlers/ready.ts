import { honami } from "../../client/honami.ts";

export const setReadyEvents = () => {
  honami.events.ready = async (_, payload) => {
    console.log(`${await payload.user.username} is ready!`)
  }
}