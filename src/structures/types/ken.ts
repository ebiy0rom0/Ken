import { Bot, Collection } from "../../deps.ts";
import { Reminder } from "../../utils/mod.ts";
import { ReminderType } from "../../utils/reminder.ts";
import { ShiftRecruiter } from "../../utils/shiftRecruiter.ts";
import { Channel } from "../discord/channel.ts";
import { Guild } from "../discord/guild.ts";
import { ChatInputInteractionCommand } from "./command.ts";

export interface Ken extends Bot {
  kv: Deno.Kv
  guild: Guild
  botChannel: Channel
  roomChannelID: bigint
  listenOnlyChannelID: bigint
  commands: Collection<string, ChatInputInteractionCommand>
  reminders: Collection<ReminderType, Reminder>
  recruiter: ShiftRecruiter
}