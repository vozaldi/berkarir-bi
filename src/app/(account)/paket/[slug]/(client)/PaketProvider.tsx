"use client";

import { QuizModel } from "@/types/models";
import { createContext, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";
import { useShallow } from "zustand/shallow";

type PaketStore = {
  quiz: QuizModel;
};

type PaketStoreApi = ReturnType<typeof createPaketStore>;

type Props = React.PropsWithChildren & {
  quiz: QuizModel;
};

const createPaketStore = (quiz: QuizModel) => {
  return createStore<PaketStore>((set) => ({
    quiz,
  }));
};

const PaketContext = createContext<PaketStoreApi | undefined>(undefined);

export default function PaketProvider({ children, quiz }: Props) {
  const storeRef = useRef<PaketStoreApi>(null);

  if (!storeRef.current) {
    storeRef.current = createPaketStore(quiz);
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
