import { CreateSlashApplicationCommand } from "../../deps.ts";
import { ChatInputInteractionContext } from "../commands/chatInputInteractionContext.ts";
import { ComponentInteractionContext } from "../commands/componentInteractionContext.ts";

export interface ChatInputInteractionCommand extends Readonly<CreateSlashApplicationCommand> {
  readonly execute: (context: ChatInputInteractionContext) => Promise<unknown>
  readonly componet?: (context: ComponentInteractionContext) => Promise<unknown>
}