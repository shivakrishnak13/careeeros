"use server";

import bcrypt from "bcryptjs";

import { cookies } from "next/headers";

import { db } from "@/lib/db";

import {
  LoginSchema,
  RegisterSchema,
  type LoginFormValues,
  type RegisterFormValues,
} from "@/features/auth/schemas";

import { COOKIE_NAME, signToken } from "@/lib/jwt";

// ─────────────────────────────────────
// REGISTER
// ─────────────────────────────────────

export async function registerAction(
  values: RegisterFormValues
) {
  const validatedFields =
    RegisterSchema.safeParse(
      values
    );

  if (!validatedFields.success) {
    return {
      error:
        "Invalid fields",
    };
  }

  const {
    name,
    email,
    password,
  } =
    validatedFields.data;

  const existingUser =
    await db.user.findUnique(
      {
        where: {
          email,
        },
      }
    );

  if (existingUser) {
    return {
      error:
        "Email already exists",
    };
  }

  const hashedPassword =
    await bcrypt.hash(
      password,
      12
    );

  await db.user.create({
    data: {
      name,
      email,
      password:
        hashedPassword,
    },
  });

  return {
    success:
      "Account created successfully",
  };
}

// ─────────────────────────────────────
// LOGIN
// ─────────────────────────────────────

export async function loginAction(
  values: LoginFormValues
) {
  const validatedFields =
    LoginSchema.safeParse(
      values
    );

  if (!validatedFields.success) {
    return {
      error:
        "Invalid fields",
    };
  }

  const {
    email,
    password,
  } =
    validatedFields.data;

  const user =
    await db.user.findUnique({
      where: {
        email,
      },
    });

  if (
    !user ||
    !user.password ||
    !user.email
  ) {
    return {
      error:
        "Invalid credentials",
    };
  }

  const passwordsMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!passwordsMatch) {
    return {
      error:
        "Invalid credentials",
    };
  }

  const token =
    await signToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

  (
    await cookies()
  ).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure:
      process.env
        .NODE_ENV ===
      "production",
    sameSite: "lax",
    path: "/",
    maxAge:
      60 *
      60 *
      24 *
      7,
  });

  return {
    success:
      "Logged in successfully",
  };
}

// ─────────────────────────────────────
// LOGOUT
// ─────────────────────────────────────

export async function logoutAction() {
  (
    await cookies()
  ).delete(COOKIE_NAME);
}
