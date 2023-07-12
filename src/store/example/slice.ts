import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ExampleSlice, ExampleUpdateField } from "../types/example";

export const initialState: ExampleSlice = {
  titleExample: "Example",
};

export const slice = createSlice({
  name: "example",
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<ExampleUpdateField>) => {
      const { key, value } = action.payload;
      return { ...state, [key]: value };
    },
    clear: () => initialState,
  },
});

export const actions = slice.actions;

export const reducer = slice.reducer;
