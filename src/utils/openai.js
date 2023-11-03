import OpenAI from "openai";
import { OPENAI_KEY } from "./conatants";

export const openai = new OpenAI({
  apiKey: OPENAI_KEY, // defaults to process.env["OPENAI_API_KEY"]
  dangerouslyAllowBrowser: true,
});
