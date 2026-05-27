"use server";

import { getCurrentUser } from "@/lib/session";
import {
  CoverLetterFormValues,
  CoverLetterSchema,
  InterviewPrepFormValues,
  InterviewPrepSchema,
  ResumeTailorFormValues,
  ResumeTailorSchema,
} from "@/features/ai-tools/schemas";
import type { InterviewQA, ActionResult } from "@/features/ai-tools/types";
import { generateAIResponse } from "@/lib/ai";

export async function generateCoverLetter(
  values: CoverLetterFormValues,
): Promise<ActionResult<string>> {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: "Unauthorized" };

    const parsed = CoverLetterSchema.safeParse(values);
    if (!parsed.success)
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };

    const { company, role, tone, jobDescription, userBackground } = parsed.data;

    const toneGuide = {
      professional: "formal, polished, and confident",
      friendly: "warm, personable, and enthusiastic",
      concise: "brief, direct, and to the point — no filler",
    }[tone];

    const prompt = `
You are an expert career coach and professional writer. Write a compelling cover letter.

Applicant name: ${user.name ?? "the applicant"}
Company: ${company}
Role: ${role}
Tone: ${toneGuide}
${jobDescription ? `Job description: ${jobDescription}` : ""}
${userBackground ? `Applicant background / notes: ${userBackground}` : ""}

Instructions:
- Write a complete, ready-to-send cover letter (3–4 paragraphs)
- Opening: express genuine interest in the role and company
- Middle: highlight relevant skills and value the applicant brings
- Closing: confident call to action
- Tone must be: ${toneGuide}
- Use the actual applicant name, not placeholders like [Your Name]
- Output only the letter body — no subject line, no extra commentary
`.trim();

    const letter = await generateAIResponse(prompt);
    return { success: true, data: letter };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    return { success: false, error: message };
  }
}

export async function generateInterviewPrep(
  values: InterviewPrepFormValues,
): Promise<ActionResult<InterviewQA[]>> {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: "Unauthorized" };

    const parsed = InterviewPrepSchema.safeParse(values);
    if (!parsed.success)
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };

    const { role, company, focusArea } = parsed.data;

    const focusGuide = {
      general: "general role-fit and motivation questions",
      technical: "technical and skills-based questions relevant to the role",
      behavioural:
        "behavioural STAR-method questions (Situation, Task, Action, Result)",
      mixed: "a balanced mix of technical, behavioural, and general questions",
    }[focusArea];

    const prompt = `
You are an expert interview coach. Generate exactly 6 realistic interview questions with strong model answers.

Role: ${role}
${company ? `Company: ${company}` : ""}
Focus: ${focusGuide}

Respond with ONLY a valid JSON array — no markdown, no code fences, no commentary:
[
  { "question": "...", "answer": "..." }
]

Rules:
- Exactly 6 items
- Answers: 3–5 sentences, practical and specific
- Behavioural answers must use STAR structure
- Technical answers should be clear without assuming irrelevant tools
`.trim();

    const raw = await generateAIResponse(prompt);

    const cleaned = raw.replace(/```json|```/gi, "").trim();
    const questions: InterviewQA[] = JSON.parse(cleaned);

    if (!Array.isArray(questions) || questions.length === 0)
      throw new Error("Unexpected response format from AI");

    return { success: true, data: questions };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    return { success: false, error: message };
  }
}

export async function tailorResume(
  values: ResumeTailorFormValues,
): Promise<ActionResult<string>> {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: "Unauthorized" };

    const parsed = ResumeTailorSchema.safeParse(values);
    if (!parsed.success)
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };

    const { resume, jobDescription } = parsed.data;

    const prompt = `
You are an expert resume writer and career coach. Your task is to rewrite and tailor the candidate's resume bullets to closely match the provided job description.

RESUME:
${resume}

JOB DESCRIPTION:
${jobDescription}

Instructions:
- Rewrite each work experience bullet point to highlight skills, keywords, and outcomes that align with the job description
- Mirror the language, terminology, and tone used in the job description
- Use strong action verbs (delivered, architected, led, optimised, etc.)
- Quantify achievements where the original resume provides numbers — do not invent figures
- Keep the structure clean: group bullets under their original role/company headings
- Add a short "Skills & Keywords" section at the bottom listing relevant technical skills and tools from the JD that the candidate appears to have
- Output only the tailored resume content — no preamble, no commentary, no markdown headers beyond the role/company labels
`.trim();

    const tailored = await generateAIResponse(prompt);
    return { success: true, data: tailored };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    return { success: false, error: message };
  }
}
