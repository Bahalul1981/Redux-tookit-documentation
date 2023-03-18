import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  todo: [],
};
export const arvidSlice = createSlice({
  name: "This not important about this name. You can give any name",
  initialState,
  reducers: {
    geetingInputfild: (state) => {
      state.value = state;
    },
    geetingFunction: (state, action) => {
      state.todo = action.payload;
    },
  },
});
export const { geetingInputfild, geetingFunction } = arvidSlice.actions;
export default arvidSlice.reducer;
