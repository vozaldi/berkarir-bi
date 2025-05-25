"use client";

import { PaketModel, QuizModel } from "@/types/models";
import { createContext, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";
import { useShallow } from "zustand/shallow";

type PaketStore = {
  paket: PaketModel;
  quiz: QuizModel | null;
};

type PaketStoreApi = ReturnType<typeof createPaketStore>;

type Props = React.PropsWithChildren & {
  paket: PaketModel;
};

const createPaketStore = (paket: PaketModel, initialState?: Partial<PaketStore>) => {
  return createStore<PaketStore>((set) => ({
    paket,
    quiz: null,
    ...initialState,
  }));
};

const PaketContext = createContext<PaketStoreApi | undefined>(undefined);

export default function PaketProvider({ children, paket }: Props) {
  const storeRef = useRef<PaketStoreApi>(null);

  if (!storeRef.current) {
    storeRef.current = createPaketStore(paket);
  }

  return (
    <PaketContext.Provider value={storeRef.current}>
      {children}
    </PaketContext.Provider>
  );
};

export const usePaketContext = () => useContext(PaketContext);


export function usePaketState() {
  const state = usePaketContext();

  if (!state) throw new Error("useUiShallow must be used within a PaketProvider");

  return state;
};

export function usePaketShallow<U>(selector: (state: PaketStore) => U): U {
  const state = usePaketContext();

  if (!state) throw new Error("useUiShallow must be used within a PaketProvider");

  return useStore(state, useShallow(selector));
};
