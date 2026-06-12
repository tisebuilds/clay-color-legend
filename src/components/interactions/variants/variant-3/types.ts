import type { ColorId } from "@/lib/colors";

export type ColorThemeEntry = {
  colorId: ColorId;
  label: string;
};

export type ColorTheme = {
  name: string;
  entries: ColorThemeEntry[];
};

export const THEME_COLOR_IDS: ColorId[] = [
  "red",
  "yellow",
  "teal",
  "green",
  "violet",
  "orange",
  "pink",
];
