import Groq from "groq-sdk";
import { env } from "@/lib/env";

const groq = new Groq({
  apiKey: env.GROQ_API_KEY,
});

export async function generateAIResponse(
  prompt: string
) {
  const response =
    await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,
      max_tokens: 1200,
    });

  return (
    response.choices[0]?.message
      ?.content ?? ""
  );
}