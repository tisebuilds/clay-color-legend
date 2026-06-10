"use client";

import { useState } from "react";
import type { ColumnsPanelColorPickerProps } from "@/components/interactions/types";
import { ColorPickerMenu } from "./color-picker-menu";
import { RenameColorsDialog } from "./rename-colors-dialog";

export function Variant2ColumnsPanelColorPicker({
  colors,
  selectedColorId,
  onSelectColor,
  onRenameColor,
  showAllColumns,
  onSelectAllColumns,
  allColumnsActive,
}: ColumnsPanelColorPickerProps) {
  const [renameOpen, setRenameOpen] = useState(false);

  return (
    <div className="border-l border-gray-200">
      <ColorPickerMenu
        showAllColumns={showAllColumns}
        colors={colors}
        selectedColorId={selectedColorId}
        onSelectColor={onSelectColor}
        onSelectAllColumns={onSelectAllColumns}
        allColumnsActive={allColumnsActive}
        onRenameClick={() => setRenameOpen(true)}
      />
      <RenameColorsDialog
        open={renameOpen}
        onOpenChange={setRenameOpen}
        colors={colors}
        onRenameColor={onRenameColor}
      />
    </div>
  );
}
