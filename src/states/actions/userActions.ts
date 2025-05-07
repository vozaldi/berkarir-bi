import { UserModel } from "@/types/models";
import { RootUserState } from "../userState";
import { StoreActions } from "@/types/reducer";

export type UserStoreActions = {
  setUser: (user: UserModel | null) => void;
};

export const userActions: StoreActions<UserStoreActions, RootUserState> = (set) => ({
  setUser: (user) => {
    set(state => ({
      ...state,
      user: !user ? null : {
        ...state.user,
        ...user,
      },
    }));
  },
});
