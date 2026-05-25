"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { loginAction } from "@/features/auth/actions";

export default function LoginPage() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    startTransition(async () => {
      const response = await loginAction({
        email: formData.email,
        password: formData.password,
      });

      if (response?.error) {
        setError(response.error);
        return;
      }

      router.push("/overview");
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4 rounded-lg border p-6"
      >
        <h1 className="text-2xl font-bold">
          Login
        </h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="rounded border p-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="rounded border p-2"
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-black p-2 text-white"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
