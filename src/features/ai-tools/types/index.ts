export type CoverLetterTone = "professional" | "friendly" | "concise";
export type InterviewFocus = "general" | "technical" | "behavioural" | "mixed";

export type CoverLetterInput = {
  company: string;
  role: string;
  tone: CoverLetterTone;
  jobDescription?: string;
  userBackground?: string;
};

export type InterviewPrepInput = {
  role: string;
  company?: string;
  focusArea: InterviewFocus;
};

export type InterviewQA = {
  question: string;
  answer: string;
};

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
