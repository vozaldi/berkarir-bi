'use client';

import { createContext, ReactNode, useRef } from "react";
import { createUiState } from "../uiState";
import { createUserState } from "../userState";
import { AppTheme } from "@/lib/statiscs/colors";

export type RootStoreApi = {
  ui: ReturnType<typeof createUiState>;
  user: ReturnType<typeof createUserState>;
};

export interface RootStoreProviderProps {
  children: ReactNode;
  theme?: AppTheme;
};

export const RootStoreContext = createContext<RootStoreApi | undefined>(undefined);

export const RootStoreProvider = ({
  children,
  theme,
}: RootStoreProviderProps) => {
  const storeRef = useRef<RootStoreApi>(null);

  if (!storeRef.current) {
    storeRef.current = {
      ui: createUiState({ theme }),
      user: createUserState(),
    };
  }

  return (
    <RootStoreContext.Provider value={storeRef.current}>
      {children}
    </RootStoreContext.Provider>
  );
};
