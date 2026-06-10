"use client";

import { useState } from "react";
import type { ColorId, ColumnColor } from "@/lib/colors";
import type { ColumnsPanelColorPickerProps } from "@/components/interactions/types";
import { ColorPickerMenu } from "./color-picker-menu";
import { RenameColorDialog } from "./rename-color-dialog";

export function Variant7ColumnsPanelColorPicker({
  colors,
  selectedColorId,
  onSelectColor,
  onRenameColor,
  showAllColumns,
  onSelectAllColumns,
  allColumnsActive,
}: ColumnsPanelColorPickerProps) {
  const [renamingColorId, setRenamingColorId] = useState<ColorId | null>(null);
  const renamingColor: ColumnColor | null =
    renamingColorId !== null
      ? (colors.find((c) => c.id === renamingColorId) ?? null)
      : null;

  return (
    <div className="border-l border-gray-200">
      <ColorPickerMenu
        showAllColumns={showAllColumns}
        colors={colors}
        selectedColorId={selectedColorId}
        onSelectColor={onSelectColor}
        onSelectAllColumns={onSelectAllColumns}
        allColumnsActive={allColumnsActive}
        onRenameClick={setRenamingColorId}
      />
      <RenameColorDialog
        open={renamingColorId !== null}
        onOpenChange={(open) => {
          if (!open) setRenamingColorId(null);
        }}
        color={renamingColor}
        onRenameColor={onRenameColor}
      />
    </div>
  );
}
