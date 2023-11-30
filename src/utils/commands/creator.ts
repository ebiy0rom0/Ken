import { ChatInputInteractionCommand } from "../../structures/types/mod.ts";

export const createCommand = (command: ChatInputInteractionCommand) => {
  return { ...command }
}
