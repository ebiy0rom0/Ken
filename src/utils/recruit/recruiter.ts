import { ken } from "../../client/ken.ts";
import { denoCron, ptera, Channel as Channelx } from "../../deps.ts";
import { Channel } from "../../structures/discord/channel.ts";
import { TimelineHelper } from "../mod.ts";

export class Recruiter {
  #demoDay: ptera.DateTime  // demo only
  timelineHelper: TimelineHelper

  constructor () {
    this.#demoDay = ptera.datetime({
      year: ptera.datetime().year,
      month: ptera.datetime().month,
      day: ptera.datetime().day
    });
    this.timelineHelper = new TimelineHelper()

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

    ken.botChannel.send({ content: `${target.format("MM月d日")}の募集を開始します` })

    const rc = await this.findRecruitChannel(target)
    if (rc) {
      const ch = new Channel(rc.id)
      await ch.send({ content: "<@&1182025900359942226>\rシフト募集を開始します" })
      await ken.kv.set(["recruit", "progress"], {
        id: rc.id,
        date: target.format("MM月d日")
      })

    } else {
      await ken.botChannel.send({ content: "募集先のチャンネルがない" })
    }
  }

  private closeRecruit = async () => {
    const timeline = new Map<bigint, boolean[]>()
    await ken.botChannel.send({ content: `募集中のチャンネルでの募集を終了します` })

    const progress = (await ken.kv.get<{id: bigint, date: string}>(["recruit", "progress"])).value
    if (progress?.id) {
      const ch = new Channel(progress.id)
      await ch.send({ content: `シフト募集を終了します` })

      const messages = await ch.messages()
      await Promise.all(messages.map(async message => {
        // ignore the bot's message
        if (message.authorId === ken.id) return
        const member = await ken.guild.member(message.authorId)

        const requestContent = message.content.match(/[0-9-,\s]+/)?.[0]
        if (!requestContent) return

        const requests = requestContent.replace(/\s+/g, "").split(",")

        const times = requests.flatMap(request => {
          const se = request.split("-")
          return [...Array(+se[1] - +se[0])].map((_, i) => i + +se[0])
        })
        timeline.set(member.id, [...Array(24).fill(false).map((_, i) => times.includes(i))])
      }))
      await ken.kv.delete(["recruit", "progress"])

    } else {
      await ken.botChannel.send({ content: `募集中のチャンネルがありません` })
    }

    timeline.forEach(async (times, userID) =>
      await this.timelineHelper.setTimeline(progress?.date!, userID, times)
    )
  }

  nextDay = async () => {
    this.#demoDay = this.#demoDay.add({ day: 1 })
    await ken.botChannel.send({ content: `${this.#demoDay.format("現在MM月d日です")}` })
  }

  resetDay = () => this.#demoDay = ptera.datetime()

  findRecruitChannel = async (dt: ptera.DateTime): Promise<Channelx | undefined> => (
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
