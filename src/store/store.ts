import { configureStore } from "@reduxjs/toolkit";
import { combinedReducers } from "./";
import { actions as allActions } from "./";

export const store = configureStore({
  reducer: combinedReducers,
  devTools: true,
});

export const actions = allActions;

export default store;
