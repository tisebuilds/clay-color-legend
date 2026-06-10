"use client";

import { createContext, useContext, useState } from "react";
import type { ColorLabelEntry } from "./types";

type Variant4LabelContextValue = {
  entries: ColorLabelEntry[];
  setEntries: (entries: ColorLabelEntry[]) => void;
};

const Variant4LabelContext = createContext<Variant4LabelContextValue | null>(null);

export function Variant4LabelProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<ColorLabelEntry[]>([]);

  return (
    <Variant4LabelContext.Provider value={{ entries, setEntries }}>
      {children}
    </Variant4LabelContext.Provider>
  );
}

export function useVariant4Labels() {
  const context = useContext(Variant4LabelContext);
  if (!context) {
    throw new Error("useVariant4Labels must be used within Variant4LabelProvider");
  }
  return context;
}
