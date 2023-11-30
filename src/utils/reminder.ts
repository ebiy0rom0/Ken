import { honami } from "../client/honami.ts";

export const ReminderTypes = {
  BURN: 1
} as const

export type ReminderType = typeof ReminderTypes[keyof typeof ReminderTypes]

export class Reminder {
  type: ReminderType

  constructor(type: ReminderType) {
    this.type = type
  }

  readonly start = async (minute: number, callback: (...args: unknown[]) => void) => {
    const id = setInterval(callback, minute * 1000)
    await honami.kv.set(["reminder", this.type], id)
  }

  readonly stop = async () => {
    const result = await honami.kv.get(["reminder", this.type])
    if (!result.value) return

    clearInterval(+result.value)
    await honami.kv.delete(["reminder", this.type])
  }
}
