import { createStore, useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import { UserModel } from "@/types/models";
import { userActions, UserStoreActions } from "./actions/userActions";
import { useRootStoreContext } from "./providers/RootStoreProvider";

export type UserStateType = {
  user: UserModel | null;
};

export type RootUserState = UserStoreActions & UserStateType;

export type UserStateMiddleware = [
  ['zustand/persist', {
    user: UserModel | null;
  }],
];

export const initialUserState: UserStateType = {
  user: null,
};

export const createUserState = (initialState?: Partial<UserStateType>) => {
  return createStore<RootUserState>()((set, get) => ({
    ...initialUserState,
    ...initialState,
    ...userActions(set, get),
  }));
};

export function useUserState() {
  const state = useRootStoreContext();

  if (!state) throw new Error("useUiShallow must be used within a RootStoreProvider");

  return state.user;
};

export function useUserShallow<U>(selector: (state: RootUserState) => U): U {
  const state = useRootStoreContext();

  if (!state) throw new Error("useUiShallow must be used within a RootStoreProvider");

  return useStore(state.user, useShallow(selector));
};
