import { Bot, Collection } from "../../deps.ts";
import { Channel } from "../discord/channel.ts";
import { Guild } from "../discord/guild.ts";
import { ChatInputInteractionCommand } from "./command.ts";
import {
  Reminder,
  ReminderType,
  PointCalculator,
  Recruiter
} from "../../utils/mod.ts";

export interface Ken extends Bot {
  kv: Deno.Kv
  guild: Guild
  botChannel: Channel
  commands: Collection<string, ChatInputInteractionCommand>
  reminders: Collection<ReminderType, Reminder>
  recruiter: Recruiter
  calcurator: PointCalculator
}