import { configureStore } from "@reduxjs/toolkit";
import commonSliceReducer from "./commonSlice";
export const store = configureStore({
  reducer: {
    common: commonSliceReducer,
  },
});

export const dispatch = store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
