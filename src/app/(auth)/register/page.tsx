"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { registerAction } from "@/features/auth/actions";

export default function RegisterPage() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setSuccess("");

    startTransition(async () => {
      const response = await registerAction(formData);

      if (response?.error) {
        setError(response.error);
        return;
      }

      setSuccess("Account created successfully");

      router.push("/login");
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4 rounded-lg border p-6"
      >
        <h1 className="text-2xl font-bold">
          Register
        </h1>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="rounded border p-2"
        />

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

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          className="rounded border p-2"
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        {success && (
          <p className="text-sm text-green-500">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-black p-2 text-white"
        >
          {isPending ? "Creating..." : "Register"}
        </button>
      </form>
    </main>
  );
}