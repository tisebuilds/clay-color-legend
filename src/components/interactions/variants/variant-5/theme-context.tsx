"use client";

import { createContext, useContext, useState } from "react";
import type { CustomTheme, ThemeEntry } from "./types";

type Variant5ThemeContextValue = {
  defaultThemeEntries: ThemeEntry[];
  setDefaultThemeEntries: (entries: ThemeEntry[]) => void;
  customTheme: CustomTheme | null;
  setCustomTheme: (theme: CustomTheme | null) => void;
};

const Variant5ThemeContext = createContext<Variant5ThemeContextValue | null>(null);

export function Variant5ThemeProvider({ children }: { children: React.ReactNode }) {
  const [defaultThemeEntries, setDefaultThemeEntries] = useState<ThemeEntry[]>([]);
  const [customTheme, setCustomTheme] = useState<CustomTheme | null>(null);

  return (
    <Variant5ThemeContext.Provider
      value={{ defaultThemeEntries, setDefaultThemeEntries, customTheme, setCustomTheme }}
    >
      {children}
    </Variant5ThemeContext.Provider>
  );
}

export function useVariant5Theme() {
  const context = useContext(Variant5ThemeContext);
  if (!context) {
    throw new Error("useVariant5Theme must be used within Variant5ThemeProvider");
  }
  return context;
}
