"use client";

import { createContext, useContext, useMemo, useState } from "react";
import {
  DEFAULT_VARIANT_ID,
  getInteractionVariant,
  INTERACTION_VARIANTS,
} from "./registry";
import type { InteractionVariant, InteractionVariantId } from "./types";

type InteractionContextValue = {
  variantId: InteractionVariantId;
  variant: InteractionVariant;
  setVariantId: (id: InteractionVariantId) => void;
  variants: InteractionVariant[];
};

const InteractionContext = createContext<InteractionContextValue | null>(null);

export function InteractionProvider({ children }: { children: React.ReactNode }) {
  const [variantId, setVariantId] = useState<InteractionVariantId>(DEFAULT_VARIANT_ID);

  const value = useMemo(
    () => ({
      variantId,
      variant: getInteractionVariant(variantId),
      setVariantId,
      variants: INTERACTION_VARIANTS,
    }),
    [variantId]
  );

  return (
    <InteractionContext.Provider value={value}>{children}</InteractionContext.Provider>
  );
}

export function useInteractionVariant() {
  const context = useContext(InteractionContext);
  if (!context) {
    throw new Error("useInteractionVariant must be used within InteractionProvider");
  }
  return context;
}
