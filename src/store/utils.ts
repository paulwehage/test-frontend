import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useStore as useReduxStore,
} from "react-redux";
import { store } from "./store";

export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useStore: () => typeof store = useReduxStore;
