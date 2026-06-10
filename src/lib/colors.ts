export type ColorId =
  | "red"
  | "yellow"
  | "blue"
  | "green"
  | "violet"
  | "orange"
  | "pink"
  | "default";

export type ColumnColor = {
  id: ColorId;
  label: string;
  swatch: string;
  header: string;
};

export const DEFAULT_COLORS: ColumnColor[] = [
  { id: "red", label: "Red", swatch: "bg-red-200", header: "bg-red-100" },
  { id: "yellow", label: "Yellow", swatch: "bg-yellow-200", header: "bg-yellow-100" },
  { id: "blue", label: "Blue", swatch: "bg-blue-200", header: "bg-blue-100" },
  { id: "green", label: "Green", swatch: "bg-green-200", header: "bg-green-100" },
  { id: "violet", label: "Violet", swatch: "bg-violet-200", header: "bg-violet-100" },
  { id: "orange", label: "Orange", swatch: "bg-orange-200", header: "bg-orange-100" },
  { id: "pink", label: "Pink", swatch: "bg-pink-200", header: "bg-pink-100" },
  { id: "default", label: "Default", swatch: "bg-muted", header: "bg-background" },
];

export function getColorById(colors: ColumnColor[], id: ColorId) {
  return colors.find((c) => c.id === id) ?? colors[colors.length - 1];
}
