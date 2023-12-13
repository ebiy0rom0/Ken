import { ken } from "../../client/ken.ts";
import { Config } from "../../config/config.ts";
import { T, usersMention } from "../../config/messages.ts";
import { Messages, rolesMention } from "../../config/messages.ts";
import { denoCron, ptera, Channel as DiscordenoChannel } from "../../deps.ts";
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

    // [warning]
    // The closeRecruit closes the recruitment for the channels saved in kv,
    // so be sure to register your cron to run before the startRecruit and
    // allow enough time for recruitment.
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
    // with prod
    // const target = this.today().add({ day: 2 })
    const target = this.#demoDay.add({ day: 2 })

    ken.botChannel.send({ content: `${T(Messages.Recruit.Admin.Start, target.format("MM月d日"))}` })

    const recruitChannel = await this.findRecruitChannel(target)
    if (!recruitChannel) {
      await ken.botChannel.send({ content: Messages.Recruit.Admin.ChannelNotFound })
      return
    }

    const ch = await Channel.New(recruitChannel.id)
    await ch.send({
      content: `${rolesMention(Config.SUPPORTER_ROLE_ID)}\r${T(Messages.Recruit.Announce.Start, target.format("MM月d日"))}`
    })
    await ken.kv.set(["recruit", "progress"], ch.id)
  }

  private closeRecruit = async () => {
    const timeline = new Map<bigint, boolean[]>()
    await ken.botChannel.send({ content: Messages.Recruit.Admin.Close })

    const recruitChannelID = (await ken.kv.get<bigint>(["recruit", "progress"])).value
    if (!recruitChannelID) {
      await ken.botChannel.send({ content: Messages.Recruit.Admin.ChannelNotExists })
      return
    }

    const formationChannel = await Channel.New(Config.EDIT_CHANNEL_ID)
    const formations = await formationChannel.messages()
    const findFormation = (id: bigint) => formations.find(edit => edit.authorId === id)?.content

    const recruitChannel = await Channel.New(recruitChannelID)
    const [
      recruitmentDate,
      activityStartTime,
      activityEndTime
    ] = [
      this.parseDate(recruitChannel.name),
      ...this.parseTimes(recruitChannel.name)
    ]
    await recruitChannel.send({ content: T(Messages.Recruit.Announce.Close, recruitmentDate) })

    const messages = await recruitChannel.messages()
    await Promise.all(messages.map(async message => {
      // ignore the bot's message
      if (message.authorId === ken.id) return

      // If it can't be determinated that a shift has been submitted,
      // it will not be counted.
      const submitContent = message.content.match(/[0-9-,\s]+/)?.[0]
      if (!submitContent) return

      const member = await ken.guild.member(message.authorId)
      const submitDetails = submitContent.replace(/\s+/g, "").split(",")

      const availableTimes = submitDetails.flatMap(detail => {
        const [startTime, endTime] = detail.split("-").map(time => +time)
        return [...Array(endTime - startTime)].map((_, i) => i + startTime)
      })
      timeline.set(member.id, [
        ...Array(activityEndTime - activityStartTime)
          .fill(false)
          .map((_, i) => availableTimes.includes(i + activityStartTime))
      ])

      const formation = findFormation(member.id)
      ken.botChannel.send({
        content: `[DEBUG]${member.displayName} => アンコロール：${member.roles.includes(Config.ENCORE_ROLE_ID)}, 編成: ${formation ?? "提出なし"}`
      })
      if (!formation) formationChannel.send({ content: `${usersMention(member.id)} 支援編成出せ😡` })
    }))

    timeline.forEach(async (times, userID) =>
      await this.timelineHelper.setTimeline(recruitmentDate, userID, times)
    )
    await ken.kv.delete(["recruit", "progress"])
  }

  private today = () => ptera.datetime({
    year: ptera.datetime().year,
    month: ptera.datetime().month,
    day: ptera.datetime().day
  })

  // for debug
  private nextDay = async () => {
    this.#demoDay = this.#demoDay.add({ day: 1 })
    await ken.botChannel.send({ content: `${this.#demoDay.format("現在MM月d日です")}` })
  }

  private findRecruitChannel = async (datetime: ptera.DateTime): Promise<DiscordenoChannel | undefined> => (
    await ken.guild.channels()).filter(
      ch => ch.name !== undefined && Boolean(ch.name.match(/^[0-9]+月[0-9]+日.*$/))
    ).find(ch => {
      const [month, day] = [this.parseMonth(ch.name!), this.parseDay(ch.name!)]

      if (!month || !day) return false

      const check = ptera.datetime({ year: ptera.datetime().year, month: month, day: day })
      return ptera.diffInDays(datetime, check) === 0
    }
  )

  // getter from JP-calendar string to month and day
  private getFromJpCalendar = (dt: string, pattern: RegExp): number | false => {
    const m = dt.match(pattern)
    return m ? +m[0] : false
  }
  private getMonthFromJpCalendar = (dt: string) => this.getFromJpCalendar(dt, /[0-9]+(?=月)/)
  private getDayFromJpCalendar   = (dt: string) => this.getFromJpCalendar(dt, /[0-9]+(?=日)/)

  // datetime parser from channel name
  private parse      = (name: string) => name.split(/-/)
  private parseDate  = (name: string) => this.parse(name)[0]
  private parseMonth = (name: string) => this.getMonthFromJpCalendar(this.parseDate(name))
  private parseDay   = (name: string) => this.getDayFromJpCalendar(this.parseDate(name))
  private parseTimes = (name: string) => {
    const [, ...times] = this.parse(name)
    return times.map(time => +time)
  }
}
