import { BitwisePermissionFlags, CreateSlashApplicationCommand } from "../../deps.ts"
import { ChatInputInteractionContext } from "../commands/chatInputInteractionContext.ts"
import { ComponentInteractionContext } from "../commands/componentInteractionContext.ts"

export interface ChatInputInteractionCommand extends Readonly<CreateSlashApplicationCommand> {
  needParmBits?: BitwisePermissionFlags[]
  readonly execute: (context: ChatInputInteractionContext) => Promise<unknown>
  readonly executeComponent?: (context: ComponentInteractionContext) => Promise<unknown>
}
