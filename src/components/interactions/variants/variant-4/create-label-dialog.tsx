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
import { LABEL_COLOR_IDS, type ColorLabelEntry } from "./types";

type CreateLabelDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  colors: ColumnColor[];
  existingEntries: ColorLabelEntry[];
  onSave: (entries: ColorLabelEntry[]) => void;
};

export function CreateLabelDialog({
  open,
  onOpenChange,
  colors,
  existingEntries,
  onSave,
}: CreateLabelDialogProps) {
  const [drafts, setDrafts] = useState<Record<ColorId, string>>({} as Record<ColorId, string>);

  const labelColors = colors.filter((c) => LABEL_COLOR_IDS.includes(c.id));

  useEffect(() => {
    if (open) {
      const initial = {} as Record<ColorId, string>;
      for (const entry of existingEntries) {
        initial[entry.colorId] = entry.label;
      }
      setDrafts(initial);
    }
  }, [open, existingEntries]);

  function handleSave() {
    const entries = labelColors
      .map((color) => ({
        colorId: color.id,
        label: drafts[color.id]?.trim() ?? "",
      }))
      .filter((entry) => entry.label.length > 0);

    onSave(entries);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-md" showCloseButton>
        <DialogHeader className="gap-1 border-b border-gray-200 px-5 py-4">
          <DialogTitle className="text-base font-semibold text-gray-900">
            Create label for any color
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-gray-500">
            Changes only apply to this workbook
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 px-5 py-4">
          {labelColors.map((color) => (
            <div key={color.id} className="flex items-center gap-3">
              <span
                className={cn(
                  "size-6 shrink-0 rounded-md border border-black/5",
                  color.swatch
                )}
              />
              <Input
                value={drafts[color.id] ?? ""}
                placeholder={color.label}
                onChange={(e) =>
                  setDrafts((prev) => ({ ...prev, [color.id]: e.target.value }))
                }
                className="h-8 flex-1 text-sm leading-relaxed"
                aria-label={`Label for ${color.label}`}
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
