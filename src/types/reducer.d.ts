export type StoreActions<Actions, State> = (
  set: (partial: State | Partial<State> | ((state: State) => State)) => void,
  get: () => State,
) => Actions;
