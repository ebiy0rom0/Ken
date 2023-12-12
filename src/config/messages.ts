
export const Messages = {
  Bonus: {
    ManualStart: "{0}、しっかり炊けよ",
    ManualStop: "今日はここまでだな",
    AutoStart: "来たな。WEEKEND GARAGE営業開始だ。",
    AutoStop: "今日は店じまいだ。",
    AlreadyStart: "",
    AlreadyStop: "",
  },
  Recruit: {
    NGReport: "共演NGを受け付けました",
    Start: "シフト募集 起動します",
    Stop: "シフト募集 停止します",
    Announce: {
      Start: "{0} のシフト募集を開始します",
      Close: "{0} のシフトの募集を終了します"
    },
    Admin: {
      Start: "{0} のシフト募集を開始します",
      Close: "募集中のチャンネルでのシフト募集を終了します",
      ChannelNotFound: "募集先のチャンネルが存在しませんでした",
      ChannelNotExists: "募集中のチャンネルがありませんでした"
    }
  },
  Calc: {
    Info: "あんよ、あんよ～...っておい。杏に手を出したら承知しないからな。"
  },
  Error: {
    Exception: "予期せぬエラーが発生した",
    CommandNotExists: "",
    ForgetReply: "へんじがないただのしかばねのようだ",
    RequestTopics: "専門外だからずんだもんにでも頼んでくれ",
    PermissionDenied: "権限が足りない"
  },
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