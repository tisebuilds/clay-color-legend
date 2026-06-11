"use client";

import { Paintbrush } from "lucide-react";
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnHeaderColorPickerProps } from "@/components/interactions/types";
import { ColorPickerMenu } from "./color-picker-menu";

export function Variant8ColumnHeaderColorPicker({
  colors,
  selectedColorId,
  onSelectColor,
  onRenameColor,
}: ColumnHeaderColorPickerProps) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Paintbrush className="size-4 text-gray-700" />
        Change color
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="w-auto min-w-44 p-0" sideOffset={4}>
        <ColorPickerMenu
          colors={colors}
          selectedColorId={selectedColorId}
          onSelectColor={onSelectColor}
          onRenameColor={onRenameColor}
        />
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
