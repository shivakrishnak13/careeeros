import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  GROQ_API_KEY: z.string(),
});

export const env = envSchema.parse(process.env);