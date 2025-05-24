'use client';

import { createContext, ReactNode, useContext, useRef } from "react";
import { createUiState } from "../uiState";
import { createUserState } from "../userState";
import { AppTheme } from "@/lib/statiscs/colors";
import { UserModel } from "@/types/models";

export type RootStoreApi = {
  ui: ReturnType<typeof createUiState>;
  user: ReturnType<typeof createUserState>;
};

export interface RootStoreProviderProps {
  children: ReactNode;
  theme?: AppTheme;
  user?: UserModel | null;
};

export const RootStoreContext = createContext<RootStoreApi | undefined>(undefined);

export let rootState: Partial<RootStoreApi> | null = null;

const updateRootState = (state: RootStoreApi) => {
  rootState = state;
};

export const RootStoreProvider = ({
  children,
  theme,
  user,
}: RootStoreProviderProps) => {
  const storeRef = useRef<RootStoreApi>(null);

  if (!storeRef.current) {
    storeRef.current = {
      ui: createUiState({ theme }),
      user: createUserState({ user }),
    };

    updateRootState(storeRef.current);
  }

  return (
    <RootStoreContext.Provider value={storeRef.current}>
      {children}
    </RootStoreContext.Provider>
  );
};

export const useRootStoreContext = () => useContext(RootStoreContext);
