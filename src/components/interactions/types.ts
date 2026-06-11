import type { ComponentType } from "react";
import type { ColorId, ColumnColor } from "@/lib/colors";

export type InteractionVariantId = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

export type ColorPickerBaseProps = {
  colors: ColumnColor[];
  selectedColorId: ColorId;
  onSelectColor: (id: ColorId) => void;
  onRenameColor: (id: ColorId, label: string) => void;
};

export type ColumnHeaderColorPickerProps = ColorPickerBaseProps;

export type ColumnsPanelColorPickerProps = ColorPickerBaseProps & {
  showAllColumns?: boolean;
  onSelectAllColumns?: () => void;
  allColumnsActive?: boolean;
};

export type InteractionVariant = {
  id: InteractionVariantId;
  label: string;
  name: string;
  description: string;
  favorite?: boolean;
  ColumnHeaderColorPicker: ComponentType<ColumnHeaderColorPickerProps>;
  ColumnsPanelColorPicker: ComponentType<ColumnsPanelColorPickerProps>;
};
