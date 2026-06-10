"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ColorId, ColumnColor } from "@/lib/colors";

type RenameColorDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  color: ColumnColor | null;
  onRenameColor: (id: ColorId, label: string) => void;
};

export function RenameColorDialog({
  open,
  onOpenChange,
  color,
  onRenameColor,
}: RenameColorDialogProps) {
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (open && color) {
      setDraft(color.label);
    }
  }, [open, color]);

  function handleSave() {
    if (!color) return;
    const trimmed = draft.trim();
    if (trimmed && trimmed !== color.label) {
      onRenameColor(color.id, trimmed);
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-md" showCloseButton>
        <DialogHeader className="gap-1 border-b border-gray-200 px-5 py-4">
          <DialogTitle className="text-base font-semibold text-gray-900">
            Rename color
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-gray-500">
            Changes only applies to colors in this workbook
          </DialogDescription>
        </DialogHeader>

        {color && (
          <div className="flex items-center gap-3 px-5 py-4">
            <span
              className={cn(
                "size-4 shrink-0 rounded-sm border border-black/5",
                color.swatch,
                color.id === "default" && "bg-white"
              )}
            />
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="h-8 flex-1 text-sm leading-relaxed"
              aria-label={`Rename ${color.label}`}
            />
          </div>
        )}

        <DialogFooter className="flex-row justify-end gap-2 border-t border-gray-200 bg-transparent px-5 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleSave}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
