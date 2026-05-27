"use client";

import { type InputHTMLAttributes, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword, type ChangePasswordValues } from "@/features/settings/actions";
import { ChangePasswordSchema } from "@/features/settings/schemas";

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  show: boolean;
  onToggle: () => void;
};

const PasswordInput = ({
  id,
  show,
  onToggle,
  placeholder = "********",
  ...rest
}: PasswordInputProps) => (
  <div className="relative">
    <Input
      id={id}
      type={show ? "text" : "password"}
      placeholder={placeholder}
      className="h-9 text-sm pr-9"
      {...rest}
    />
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
      tabIndex={-1}
    >
      {show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
    </button>
  </div>
);

export default function ChangePasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success?: string; error?: string } | null>(null);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordValues>({ resolver: zodResolver(ChangePasswordSchema) });

  const onSubmit = (values: ChangePasswordValues) => {
    setResult(null);
    startTransition(async () => {
      const res = await changePassword(values);
      setResult(res);
      if (res?.success) reset();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="currentPassword" className="text-xs font-medium text-foreground">
          Current password
        </Label>
        <PasswordInput
          id="currentPassword"
          show={showCurrent}
          onToggle={() => setShowCurrent((v) => !v)}
          {...register("currentPassword")}
        />
        {errors.currentPassword && (
          <p className="text-xs text-destructive">{errors.currentPassword.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="newPassword" className="text-xs font-medium text-foreground">
          New password
        </Label>
        <PasswordInput
          id="newPassword"
          show={showNew}
          onToggle={() => setShowNew((v) => !v)}
          {...register("newPassword")}
        />
        {errors.newPassword && (
          <p className="text-xs text-destructive">{errors.newPassword.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="confirmPassword" className="text-xs font-medium text-foreground">
          Confirm new password
        </Label>
        <PasswordInput
          id="confirmPassword"
          show={showConfirm}
          onToggle={() => setShowConfirm((v) => !v)}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
        )}
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
          Update password
        </Button>
      </div>
    </form>
  );
}
