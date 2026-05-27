"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { COOKIE_NAME, signToken } from "@/lib/jwt";
import { logoutAction } from "@/features/auth/actions";
import {
  ChangePasswordSchema,
  UpdateProfileSchema,
} from "@/features/settings/schemas";

export type UpdateProfileValues = z.infer<typeof UpdateProfileSchema>;
export type ChangePasswordValues = z.infer<typeof ChangePasswordSchema>;

export async function updateProfile(values: UpdateProfileValues) {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  const parsed = UpdateProfileSchema.safeParse(values);
  if (!parsed.success) return { error: "Invalid fields" };

  const { name, email } = parsed.data;

  if (email !== user.email) {
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) return { error: "Email already in use" };
  }

  const updated = await db.user.update({
    where: { id: user.id },
    data: { name, email },
  });

  const token = await signToken({
    id: updated.id,
    email,
    name: updated.name,
  });

  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return { success: "Profile updated" };
}

export async function changePassword(values: ChangePasswordValues) {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  const parsed = ChangePasswordSchema.safeParse(values);
  if (!parsed.success)
    return { error: parsed.error.issues[0]?.message ?? "Invalid fields" };

  const dbUser = await db.user.findUnique({ where: { id: user.id } });
  if (!dbUser?.password) return { error: "No password set on this account" };
  console.log({ dbUser });
  const matches = await bcrypt.compare(
    parsed.data.currentPassword,
    dbUser.password,
  );
  if (!matches) return { error: "Current password is incorrect" };

  const hashed = await bcrypt.hash(parsed.data.newPassword, 12);
  await db.user.update({ where: { id: user.id }, data: { password: hashed } });

  return { success: "Password changed successfully" };
}

export async function deleteAccount() {
  const user = await getCurrentUser();
  console.log(user);
  if (!user) return { error: "Unauthorized" };

  await db.user.delete({ where: { id: user.id } });
  await logoutAction();
  redirect("/register");
}
