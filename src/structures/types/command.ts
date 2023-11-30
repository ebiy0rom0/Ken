import { CreateSlashApplicationCommand } from "../../deps.ts";
import { ChatInputInteractionContext } from "../commands/chatInputInteractionContext.ts";

export interface ChatInputInteractionCommand extends Readonly<CreateSlashApplicationCommand> {
  readonly execute: (context: ChatInputInteractionContext) => Promise<unknown>
}