
export const Messages = {
  Bonus: {
    Start: "{0}、しっかり炊けよ",
    Stop: "今日はここまでだな"
  },
  Recruit: {
    NGReport: "共演NGを受付ました",
    Start: "{0} のシフト募集を開始します",
    Stop: "{0} のシフトの募集を終了します"
  },
  Calc: {
    Info: "あんよ、あんよ～...っておい。杏に手を出したら承知しないからな。"
  },
  Error: {
    ForgetReply: "へんじがないただのしかばねのようだ"
  },
  Debug: {

  }
}

// replace from {0} to args[0]
// short hands "T"emplate replacement.
// deno-lint-ignore no-explicit-any
export const T = (template: string, ...args: any[]): string => {
  args.forEach((_, i) => template.replace(`{${i}}`, args[i]))
  return template
}
