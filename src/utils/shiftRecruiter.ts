import { ken } from "../client/ken.ts";
import { denoCron, ptera, Channel as Channelx } from "../deps.ts";
import { Channel } from "../structures/discord/channel.ts";
import { SheetTimelineHelper } from "./googleSheet/sheetTimelineHelper.ts";

export class ShiftRecruiter {
  #demoDay: ptera.DateTime  // demo only
  tlHelper: SheetTimelineHelper

  constructor () {
    this.#demoDay = ptera.datetime({
      year: ptera.datetime().year,
      month: ptera.datetime().month,
      day: ptera.datetime().day
    });
    this.tlHelper = new SheetTimelineHelper()

    denoCron.cron("5 */1 * * * *", async () => {
      await this.closeRecruit()
    })
    denoCron.cron("10 */1 * * * *", async () => {
      await this.startRecruit()
    })
    denoCron.cron("30 */1 * * * *", async () => {
      await this.nextDay()
    })

    // Don't run until explicitly initiated.
    this.stop()
  }

  start = () => denoCron.start()
  stop  = () => denoCron.stop()

  private startRecruit = async () => {
    const target = this.#demoDay.add({ day: 2 })

    ken.botChannel.send({ content: `${target.format("MM月dd日")}の募集を開始します` })

    const startRecruitChannel = await this.getRecruitChannel(target)
    if (startRecruitChannel) {
      const recruitChannel = new Channel(startRecruitChannel.id)
      await recruitChannel.send({ content: "<@&1182025900359942226>\rシフト募集を開始します" })
      await ken.kv.set(["recruit", "id"], startRecruitChannel.id)
      await ken.kv.set(["recruit", "date"], target.format("MM月d日"))
    } else {
      await ken.botChannel.send({ content: "募集先のチャンネルがない" })
    }
  }

  private closeRecruit = async () => {
    const timeline = new Map<string, boolean[]>()
    await ken.botChannel.send({ content: `募集中のチャンネルでの募集を終了します` })

    const closeRecruitChannelID = (await ken.kv.get<bigint>(["recruit", "id"])).value
    if (closeRecruitChannelID) {
      const recruitChannel = new Channel(closeRecruitChannelID)
      await recruitChannel.send({ content: `シフト募集を終了します` })

      const messages = await recruitChannel.messages()
      await Promise.all(messages.map(async message => {
        // ignore the bot's message
        if (message.authorId == ken.id) return
        const user = await ken.guild.member(message.authorId)

        const requestContent = message.content.match(/[0-9-,\s]+/)?.[0]
        if (!requestContent) return

        const requests = requestContent.replace(/\s+/g, "").split(",")

        const times = requests.flatMap(request => {
          const se = request.split("-")
          return [...Array(+se[1] - +se[0])].map((_, i) => i + +se[0])
        })
        timeline.set(user.user?.username!, [...Array(24).fill(false).map((_, i) => times.includes(i))])
      }))
      await ken.kv.delete(["recruit", "id"])

    } else {
      await ken.botChannel.send({ content: `募集中のチャンネルがありません` })
    }

    const date = await ken.kv.get<string>(["recruit", "date"])
    timeline.forEach(async (times, user) => {
      await this.tlHelper.setTimeline(date.value!, user, times)
      await ken.botChannel.send({ content: `${user}|${times.join(",")}` })
    })
  }

  nextDay = async () => {
    this.#demoDay = this.#demoDay.add({ day: 1 })
    await ken.botChannel.send({ content: `${this.#demoDay.format("現在MM月dd日です")}` })
  }

  resetDay = () => this.#demoDay = ptera.datetime()

  getRecruitChannel = async (dt: ptera.DateTime): Promise<Channelx | undefined> => (
    await ken.guild.channels()).filter(
      ch => ch.name !== undefined && Boolean(ch.name.match(/^[0-9]+月[0-9]+日.*$/))
    ).find(ch => {
      const date = ch.name ? ch.name.split(/_/)[0] : ""
      const month = this.getMonthFromJpCalendar(date)
      const day = this.getDayFromJpCalendar(date)

      if (!month || !day) return false

      const check = ptera.datetime({ year: ptera.datetime().year, month: month, day: day })
      return ptera.diffInDays(dt, check) === 0
    }
  )

  getFromJpCalendar = (dt: string, pattern: RegExp): number | false => {
    const m = dt.match(pattern)
    return m ? +m[0] : false
  }
  getMonthFromJpCalendar = (dt: string) => this.getFromJpCalendar(dt, /[0-9]+(?=月)/)
  getDayFromJpCalendar   = (dt: string) => this.getFromJpCalendar(dt, /[0-9]+(?=日)/)
}
