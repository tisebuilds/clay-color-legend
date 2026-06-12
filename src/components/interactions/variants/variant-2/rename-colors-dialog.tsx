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
  const [drafts, setDrafts] = useState<Record<ColorId, string>>({} as Record<ColorId, string>);

  useEffect(() => {
    if (open) {
      setDrafts(Object.fromEntries(colors.map((c) => [c.id, c.label])) as Record<ColorId, string>);
    }
  }, [open, colors]);

  function handleSave() {
    for (const color of colors) {
      const trimmed = drafts[color.id]?.trim();
      if (trimmed && trimmed !== color.label) {
        onRenameColor(color.id, trimmed);
      }
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 bg-white p-0 sm:max-w-md" showCloseButton>
        <DialogHeader className="gap-1 border-b border-gray-200 px-5 py-4">
          <DialogTitle className="text-base font-semibold text-gray-900">
            Rename colors
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-gray-500">
            Changes only apply to colors in this table.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 px-5 py-4">
          {colors.map((color) => (
            <div key={color.id} className="flex items-center gap-3">
              <ColorSwatch color={color} />
              <Input
                value={drafts[color.id] ?? color.label}
                onChange={(e) =>
                  setDrafts((prev) => ({ ...prev, [color.id]: e.target.value }))
                }
                className="h-9 flex-1 rounded-md border-gray-200 text-sm leading-relaxed"
                aria-label={`Rename ${color.label}`}
              />
            </div>
          ))}
        </div>

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
