// This
import { ChatInputInteractionCommand } from "../structures/types/mod.ts"

import __topics from "./talk/topics.ts"
import __recruit from "./recruit/recruit.ts"
import __employment from "./recruit/employment.ts"
import __ng from "./recruit/ng.ts"
import __brainPower from "./sings/brainPower.ts"
import __calculate from "./point/calculate.ts"
import __burn from "./bonus/burn.ts"
import __burnOut from "./bonus/burnOut.ts"

export const modules: ChatInputInteractionCommand[] = [
  __topics,
  __recruit,
  __employment,
  __ng,
  __brainPower,
  __calculate,
  __burn,
  __burnOut,
]
