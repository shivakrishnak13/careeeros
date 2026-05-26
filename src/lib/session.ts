import { cookies } from "next/headers";
import { verifyToken, COOKIE_NAME } from "@/lib/jwt";
import type { JWTPayload } from "@/lib/jwt";

export async function getCurrentUser(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}