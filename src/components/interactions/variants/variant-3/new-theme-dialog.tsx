"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
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
import { THEME_COLOR_IDS, type ColorTheme } from "./types";

type NewThemeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  colors: ColumnColor[];
  onCreateTheme: (theme: ColorTheme) => void;
};

export function NewThemeDialog({
  open,
  onOpenChange,
  colors,
  onCreateTheme,
}: NewThemeDialogProps) {
  const [drafts, setDrafts] = useState<Record<ColorId, string>>({} as Record<ColorId, string>);

  const themeColors = colors.filter((c) => THEME_COLOR_IDS.includes(c.id));

  useEffect(() => {
    if (open) {
      setDrafts({} as Record<ColorId, string>);
    }
  }, [open]);

  function handleCreate() {
    const entries = themeColors
      .map((color) => ({
        colorId: color.id,
        label: drafts[color.id]?.trim() ?? "",
      }))
      .filter((entry) => entry.label.length > 0);

    if (entries.length === 0) return;

    onCreateTheme({
      name: "Theme name",
      entries,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-md" showCloseButton>
        <DialogHeader className="gap-1 border-b border-gray-200 px-5 py-4">
          <DialogTitle className="text-base font-semibold text-gray-900">
            New theme
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-gray-500">
            Only available to colors in this workbook
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 px-5 py-4">
          {themeColors.map((color) => {
            const draft = drafts[color.id] ?? "";
            const isNamed = draft.trim().length > 0;

            return (
              <div key={color.id} className="flex items-center gap-3">
                <span
                  className={cn(
                    "relative flex size-6 shrink-0 items-center justify-center rounded-md border border-black/5",
                    color.swatch
                  )}
                >
                  {isNamed && <Check className="size-3.5 text-blue-600" strokeWidth={2.5} />}
                </span>
                <Input
                  value={draft}
                  placeholder={color.label}
                  onChange={(e) =>
                    setDrafts((prev) => ({ ...prev, [color.id]: e.target.value }))
                  }
                  className="h-8 flex-1 text-sm leading-relaxed"
                  aria-label={`Name for ${color.label}`}
                />
              </div>
            );
          })}
        </div>

        <DialogFooter className="flex-row justify-end gap-2 border-t border-gray-200 bg-transparent px-5 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleCreate}
          >
            Create theme
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
