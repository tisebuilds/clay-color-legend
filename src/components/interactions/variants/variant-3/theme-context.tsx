"use client";

import { createContext, useContext, useState } from "react";
import type { ColorTheme } from "./types";

type Variant3ThemeContextValue = {
  theme: ColorTheme | null;
  setTheme: (theme: ColorTheme | null) => void;
};

const Variant3ThemeContext = createContext<Variant3ThemeContextValue | null>(null);

export function Variant3ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ColorTheme | null>(null);

  return (
    <Variant3ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </Variant3ThemeContext.Provider>
  );
}

export function useVariant3Theme() {
  const context = useContext(Variant3ThemeContext);
  if (!context) {
    throw new Error("useVariant3Theme must be used within Variant3ThemeProvider");
  }
  return context;
}
