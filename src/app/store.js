import { configureStore } from "@reduxjs/toolkit";
import myFirstSclice from "../features/counterSlice";
import arvidSlicer from "../features/arvidSlicer";
export const Store = configureStore({
  reducer: { show: myFirstSclice, arvid: arvidSlicer },
});
