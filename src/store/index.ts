import { configureStore } from "@reduxjs/toolkit";
import artworksReducer from "./artworks/artworksSlice";

export const store = configureStore({
  reducer: {
    arworks: artworksReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
