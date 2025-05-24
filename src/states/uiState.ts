import { createStore, useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import { LayoutObject } from "../types/utilities";
import { uiActions, UiStoreActions } from "./actions/uiActions";
import { AppTheme } from "@/lib/statiscs/colors";
import { useRootStoreContext } from "./providers/RootStoreProvider";

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

export function useUiState() {
  const state = useRootStoreContext();

  if (!state) throw new Error("Hook must be used within a RootStoreProvider");

  return state.ui;
};

export function useUiShallow<U>(selector: (state: RootUIState) => U): U {
  const state = useRootStoreContext();

  if (!state) throw new Error("Hook must be used within a RootStoreProvider");

  return useStore(state.ui, useShallow(selector));
};
