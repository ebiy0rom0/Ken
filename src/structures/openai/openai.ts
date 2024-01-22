// import { ken } from "../../client/ken.ts"
// import { openai } from "../../client/openai.ts"

// const completion = await openai.chat.completions.create({
//   messages: [{ role: "user", content: "会話の話題を列挙してください" }],
//   model: "gpt-3.5-turbo",
// }).catch((e) => console.log(e))

// if (completion && completion.choices[0]?.message?.content != null) {
//   ken.helpers.sendMessage(ken.botInfoChannelID, { content: completion.choices[0]?.message?.content })
// } else {
//   console.log(JSON.stringify(completion))
// }
