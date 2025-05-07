import { StoreActions } from "@/types/reducer";
import { RootUIState, UiTypographySize } from "../uiState";

export type UiStoreActions = {
  setTheme: (theme: 'light' | 'dark') => void;
  setMenuOpen: (open: boolean) => void;
  setLoginOpen: (open: boolean) => void;

  setTypographySize: (size: UiTypographySize) => void;
};

export const uiActions: StoreActions<UiStoreActions, RootUIState> = (set): UiStoreActions => ({
  // Open State
  setTheme: (theme: 'light' | 'dark') => set((state) => ({ ...state, theme })),
  setMenuOpen: (open: boolean) => set((state) => ({ ...state, menuOpen: open })),
  setLoginOpen: (open: boolean) => set((state) => ({ ...state, loginOpen: open })),

  // Typography
  setTypographySize: (size: UiTypographySize) => {
    return set((state) => ({
      ...state,
      typography: {
        ...state.typography,
        size
      }
    }));
  },
});
