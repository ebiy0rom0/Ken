
export const Messages = {
  Bonus: {
    ManualStart: "{0}、しっかり炊けよ",
    ManualStop: "今日はここまでだな",
    AutoStart: "来たな。WEEKEND GARAGE営業開始だ。",
    AutoStop: "今日は店じまいだ。"
  },
  Recruit: {
    NGReport: "共演NGを受付ました",
    Start: "シフト募集 起動",
    Stop: "シフト募集 停止",
    Announce: {
      Start: "{0} のシフト募集を開始します",
      Close: "{0} のシフトの募集を終了します"
    },
  },
  Calc: {
    Info: "あんよ、あんよ～...っておい。杏に手を出したら承知しないからな。"
  },
  Error: {
    ForgetReply: "へんじがないただのしかばねのようだ"
  },
  Debug: {
    Replace: "{0}、こんにちは"
  }
}

// replace from {0} to args[0]
// short hands "T"emplate replacement.
// deno-lint-ignore no-explicit-any
export const T = (template: string, ...args: any[]): string => {
  args.forEach((v, i) => template = template.replace(new RegExp(`\\{${i}\\}`), v))
  return template
}

export const rolesMention = (id: bigint) => `<@&${id}>`
export const usersMention = (id: bigint) => `<@!${id}>`