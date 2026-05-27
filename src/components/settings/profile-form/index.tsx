"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile, type UpdateProfileValues } from "@/features/settings/actions";
import { UpdateProfileSchema } from "@/features/settings/schemas";

type Props = {
  initialName: string;
  initialEmail: string;
};

export default function ProfileForm({ initialName, initialEmail }: Props) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success?: string; error?: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileValues>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: { name: initialName, email: initialEmail },
  });

  const onSubmit = (values: UpdateProfileValues) => {
    setResult(null);
    startTransition(async () => {
      const res = await updateProfile(values);
      setResult(res ?? { success: "Profile updated" });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-xs font-medium text-foreground">
          Full name
        </Label>
        <Input
          id="name"
          placeholder="Your name"
          {...register("name")}
          className="h-9 text-sm"
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-xs font-medium text-foreground">
          Email address
        </Label>
        <Input
          id="email"
          type="email"
          value={initialEmail}
          readOnly
          disabled
          className="h-9 text-sm bg-muted/50 text-muted-foreground cursor-not-allowed select-all"
        />
        <p className="text-xs text-muted-foreground">
          Your email address cannot be changed.
        </p>
      </div>

      <div className="flex items-center justify-between pt-1">
        {result?.success && (
          <span className="flex items-center gap-1.5 text-xs text-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {result.success}
          </span>
        )}
        {result?.error && (
          <span className="flex items-center gap-1.5 text-xs text-destructive">
            <AlertCircle className="w-3.5 h-3.5" />
            {result.error}
          </span>
        )}
        {!result && <span />}

        <Button
          type="submit"
          disabled={isPending}
          size="sm"
          className="h-8 bg-brand-600 hover:bg-brand-700 text-white text-xs"
        >
          {isPending && <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />}
          Save changes
        </Button>
      </div>
    </form>
  );
}