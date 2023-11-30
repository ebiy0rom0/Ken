import { CreateSlashApplicationCommand } from "../../deps.ts";
import { InteractionContext } from "../commands/interactionContext.ts";

export interface ChatInputInteractionCommand extends Readonly<CreateSlashApplicationCommand> {
  readonly execute: (context: InteractionContext) => Promise<unknown>
}