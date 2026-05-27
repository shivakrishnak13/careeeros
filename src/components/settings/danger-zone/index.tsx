"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { logoutAction } from "@/features/auth/actions";
import { deleteAccount } from "@/features/settings/actions";

export default function DangerZone() {
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isLoggingOut, startLogout] = useTransition();

  const handleLogout = () => {
    startLogout(async () => {
      await logoutAction();
      router.push("/login");
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      await deleteAccount();
    });
  };

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-medium text-foreground">Sign out</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Sign out from this device
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="h-8 text-xs gap-1.5 flex-shrink-0"
          >
            {isLoggingOut ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <LogOut className="w-3.5 h-3.5" />
            )}
            Sign out
          </Button>
        </div>

        <div className="border-t border-border" />

        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-medium text-red-600">Delete account</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Permanently delete your account and all data
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteOpen(true)}
            className="h-8 text-xs gap-1.5 flex-shrink-0 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-700"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </Button>
        </div>
      </div>

      <Dialog
        open={deleteOpen}
        onOpenChange={(o) => {
          setDeleteOpen(o);
          setConfirmText("");
        }}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete your account?</DialogTitle>
            <DialogDescription>
              This will permanently delete your account and all job application data. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-1.5 mt-1">
            <Label htmlFor="confirm" className="text-xs">
              Type{" "}
              <span className="font-semibold text-foreground">delete my account</span>{" "}
              to confirm
            </Label>
            <Input
              id="confirm"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="delete my account"
              className="h-9 text-sm"
            />
          </div>

          <div className="flex gap-2 justify-end mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setDeleteOpen(false);
                setConfirmText("");
              }}
              disabled={isPending}
              className="h-8 text-xs"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleDelete}
              disabled={confirmText !== "delete my account" || isPending}
              className="h-8 text-xs bg-red-500 hover:bg-red-600 text-white"
            >
              {isPending && <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />}
              Delete account
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}