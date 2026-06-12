"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { ColorId, ColumnColor } from "@/lib/colors";
import { ColorSwatch } from "./color-swatch";

type RenameColorsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  colors: ColumnColor[];
  onRenameColor: (id: ColorId, label: string) => void;
};

export function RenameColorsDialog({
  open,
  onOpenChange,
  colors,
  onRenameColor,
}: RenameColorsDialogProps) {
  const renameableColors = useMemo(
    () => colors.filter((color) => color.id !== "default"),
    [colors]
  );
  const [drafts, setDrafts] = useState<Record<ColorId, string>>({} as Record<ColorId, string>);

  useEffect(() => {
    if (open) {
      setDrafts(
        Object.fromEntries(renameableColors.map((c) => [c.id, c.label])) as Record<
          ColorId,
          string
        >
      );
    }
  }, [open, renameableColors]);

  function handleSave() {
    for (const color of renameableColors) {
      const trimmed = drafts[color.id]?.trim();
      if (trimmed && trimmed !== color.label) {
        onRenameColor(color.id, trimmed);
      }
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="gap-0 overflow-hidden bg-white p-0 shadow-lg ring-0 sm:max-w-[420px]"
        showCloseButton
      >
        <DialogHeader className="gap-0 border-b border-gray-200 px-5 py-4">
          <DialogTitle className="pr-8 text-base font-semibold text-gray-900">
            Rename colors
          </DialogTitle>
        </DialogHeader>

        <div className="px-5 py-4">
          <p className="mb-4 text-sm leading-relaxed text-gray-500">
            Changes only apply to colors in this table.
          </p>

          <div className="flex flex-col gap-3">
            {renameableColors.map((color) => (
              <div
                key={color.id}
                className="flex h-10 items-center gap-2 rounded-md border border-gray-200 bg-white px-3 focus-within:border-gray-300"
              >
                <ColorSwatch color={color} className="size-4 shrink-0" />
                <Input
                  value={drafts[color.id] ?? color.label}
                  onChange={(e) =>
                    setDrafts((prev) => ({ ...prev, [color.id]: e.target.value }))
                  }
                  className="h-auto min-h-0 flex-1 border-0 bg-transparent p-0 text-sm leading-relaxed text-gray-600 shadow-none focus-visible:border-transparent focus-visible:ring-0"
                  aria-label={`Rename ${color.label}`}
                />
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="mx-0 mb-0 flex-row justify-end gap-2 border-t border-gray-200 bg-white px-5 py-4">
          <Button
            variant="outline"
            className="border-gray-200 bg-white text-gray-900 shadow-none hover:bg-gray-50"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#2563EB] text-white shadow-none hover:bg-[#1D4ED8]"
            onClick={handleSave}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
