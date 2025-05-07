import { create, createStore } from "zustand";
import { useShallow } from "zustand/shallow";
import { LayoutObject } from "../types/utilities";
import { uiActions, UiStoreActions } from "./actions/uiActions";
import { createJSONStorage, persist } from "zustand/middleware";
import { AppTheme } from "@/lib/statiscs/colors";

export type UiTypographySize = 'base' | 'sm' | 'lg' | 'xl';
export type UiTypographyState = {
  size: UiTypographySize;
};

export type UIStateType = {
  theme: AppTheme | null;
  menuOpen: boolean;
  loginOpen: boolean;
  layouts: LayoutObject;
  typography: UiTypographyState;
};

export type RootUIState = UiStoreActions & UIStateType;

export type UiStateMiddleware = [
  ['zustand/persist', {
    theme: AppTheme | null;
  }],
];

export const initialUiState: UIStateType = {
  theme: 'light',
  menuOpen: false,
  loginOpen: false,
  layouts: {},
  typography: {
    size: 'base',
  },
};

export const createUiState = (initialState?: Partial<UIStateType>) => {
  return createStore<RootUIState>()((set, get) => ({
    ...initialUiState,
    ...initialState,
    ...uiActions(set, get),
  }));
};

export const useUiState = create<RootUIState, UiStateMiddleware>(
  persist(
    (set, get) => ({
      ...initialUiState,
      ...uiActions(set, get),
    }),
    {
      name: "ui-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        typography: state.typography,
      }),
    },
  )
);

export function useUiShallow<U>(selector: (state: RootUIState) => U): U {
  return useUiState(useShallow(selector));
};
