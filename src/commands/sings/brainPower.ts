import { createCommand } from "../../utils/mod.ts";

export default createCommand({
  name: "brain-power",
  description: "Brain Powerを歌います。",

  execute: async ctx => await ctx.reply({
    content: "O-oooooooooo AAAAE-A-A-I-A-U- JO-oooooooooooo AAE-O-A-A-U-U-A- E-eee-ee-eee AAAAE-A-E-I-E-A- JO-ooo-oo-oo-oo EEEEO-A-AAA-AAAA"
  })
})
