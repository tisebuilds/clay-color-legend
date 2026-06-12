import type { ColorId } from "@/lib/colors";

export type ColorLabelEntry = {
  colorId: ColorId;
  label: string;
};

export const LABEL_COLOR_IDS: ColorId[] = [
  "red",
  "yellow",
  "teal",
  "green",
  "violet",
  "orange",
  "pink",
];
