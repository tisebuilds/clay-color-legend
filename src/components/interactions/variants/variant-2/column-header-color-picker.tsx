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
import { RenameColorsDialog } from "./rename-colors-dialog";

export function Variant2ColumnHeaderColorPicker({
  colors,
  selectedColorId,
  onSelectColor,
  onRenameColor,
}: ColumnHeaderColorPickerProps) {
  const [renameOpen, setRenameOpen] = useState(false);

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
            onRenameClick={() => setRenameOpen(true)}
          />
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <RenameColorsDialog
        open={renameOpen}
        onOpenChange={setRenameOpen}
        colors={colors}
        onRenameColor={onRenameColor}
      />
    </>
  );
}
