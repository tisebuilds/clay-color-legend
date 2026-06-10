"use client";

import { useState } from "react";
import { Paintbrush } from "lucide-react";
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnHeaderColorPickerProps } from "@/components/interactions/types";
import { ColorPickerMenu } from "./color-picker-menu";
import { CreateLabelDialog } from "./create-label-dialog";
import { useVariant4Labels } from "./label-context";

export function Variant4ColumnHeaderColorPicker({
  colors,
  selectedColorId,
  onSelectColor,
}: ColumnHeaderColorPickerProps) {
  const { entries, setEntries } = useVariant4Labels();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <Paintbrush className="size-4 text-gray-700" />
          Change color
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="w-44 p-0" sideOffset={4}>
          <ColorPickerMenu
            colors={colors}
            selectedColorId={selectedColorId}
            onSelectColor={onSelectColor}
            onAddLabelClick={() => setDialogOpen(true)}
            labelEntries={entries}
          />
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <CreateLabelDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        colors={colors}
        existingEntries={entries}
        onSave={setEntries}
      />
    </>
  );
}
