import { ken } from "../../client/ken.ts"

export const ReminderTypes = {
  BURN: 1,
} as const

export type ReminderType = typeof ReminderTypes[keyof typeof ReminderTypes]

export class Reminder {
  #id = 0
  constructor(private type: ReminderType) {}

  readonly start = (delay: number, callback: (...args: unknown[]) => void) => {
    this.#id = setInterval(callback, delay)
    ken.reminders.set(this.type, this)
  }

  readonly stop = () => {
    clearInterval(this.#id)
    ken.reminders.delete(this.type)
  }
}
