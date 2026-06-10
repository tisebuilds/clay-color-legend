"use client";

import { useState } from "react";
import type { ColumnsPanelColorPickerProps } from "@/components/interactions/types";
import { ColorPickerMenu } from "./color-picker-menu";
import { CreateLabelDialog } from "./create-label-dialog";
import { useVariant4Labels } from "./label-context";

export function Variant4ColumnsPanelColorPicker({
  colors,
  selectedColorId,
  onSelectColor,
  showAllColumns,
  onSelectAllColumns,
  allColumnsActive,
}: ColumnsPanelColorPickerProps) {
  const { entries, setEntries } = useVariant4Labels();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="border-l border-gray-200">
      <ColorPickerMenu
        showAllColumns={showAllColumns}
        colors={colors}
        selectedColorId={selectedColorId}
        onSelectColor={onSelectColor}
        onSelectAllColumns={onSelectAllColumns}
        allColumnsActive={allColumnsActive}
        onAddLabelClick={() => setDialogOpen(true)}
        labelEntries={entries}
      />
      <CreateLabelDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        colors={colors}
        existingEntries={entries}
        onSave={setEntries}
      />
    </div>
  );
}
