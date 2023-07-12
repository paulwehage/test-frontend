import * as example from "./example";
import { combineReducers } from "@reduxjs/toolkit";
import { ExampleSlice } from "./types";

export type State = {
  example: ExampleSlice;
};

export const combinedReducers = combineReducers({
  example: example.reducer,
});

export const actions = Object.freeze({
  example: example.actions,
});
