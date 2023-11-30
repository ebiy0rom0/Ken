import { Config } from "../config/config.ts";
import { OpenAI } from "../deps.ts";

export const openai = new OpenAI.OpenAI({
  apiKey: Config.OPENAI_API_KEY
})
