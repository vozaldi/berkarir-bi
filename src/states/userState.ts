import { create, createStore } from "zustand";
import { useShallow } from "zustand/shallow";
import { createJSONStorage, persist } from "zustand/middleware";
import { UserModel } from "@/types/models";
import { userActions, UserStoreActions } from "./actions/userActions";

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

export const createUserState = (initialState: UserStateType = initialUserState) => {
  return createStore<RootUserState>()((set, get) => ({
    ...initialState,
    ...userActions(set, get),
  }));
};

export const useUserState = create<RootUserState, UserStateMiddleware>(
  persist(
    (set, get) => ({
      ...initialUserState,
      ...userActions(set, get),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
      }),
    },
  )
);

export function useUserShallow<U>(selector: (state: RootUserState) => U): U {
  return useUserState(useShallow(selector));
};
