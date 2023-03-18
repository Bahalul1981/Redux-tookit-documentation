import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  name: "Arvid dawn amin",
  age: 38,
  city: "Stockholm",
};

export const myFirstSclice = createSlice({
  name: "anyName",
  initialState,
  reducers: {
    showMyInfo: (state) => {
      state.value = state;
    },
    reducerFuntion: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { showMyInfo, reducerFuntion } = myFirstSclice.actions;
export default myFirstSclice.reducer;
