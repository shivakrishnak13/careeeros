"use client";

import { useState, useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteJob } from "@/features/applications/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type DeleteJobButtonProps = {
  id: string;
  company: string;
  role: string;
  variant?: "icon" | "button";
  className?: string;
};

export default function DeleteJobButton({
  id,
  company,
  role,
  variant = "icon",
  className,
}: DeleteJobButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteJob(id);
      setOpen(false);
    });
  };

  return (
    <>
      {variant === "button" ? (
        <Button
          type="button"
          variant="destructive"
          onClick={() => setOpen(true)}
          className={className}
        >
          <Trash2 className="w-4 h-4" />
          Delete application
        </Button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className={className ?? "p-1.5 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"}
          aria-label="Delete application"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete application?</DialogTitle>
            <DialogDescription>
              This will permanently remove <span className="font-medium text-foreground">{role}</span> at{" "}
              <span className="font-medium text-foreground">{company}</span>. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end mt-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleDelete}
              disabled={isPending}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
