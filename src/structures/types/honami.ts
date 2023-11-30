import { Bot, Collection } from "../../deps.ts";
import { Reminder } from "../../utils/mod.ts";
import { ReminderType } from "../../utils/reminder.ts";
import { ChatInputInteractionCommand } from "./command.ts";

export interface Honami extends Bot {
  kv: Deno.Kv
  allowedGuildID: bigint
  roomChannelID: bigint
  listenOnlyChannelID: bigint
  botInfoChannelID: bigint
  commands: Collection<string, ChatInputInteractionCommand>
  reminders: Collection<ReminderType, Reminder>
}