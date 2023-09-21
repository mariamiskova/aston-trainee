import { configureStore } from "@reduxjs/toolkit";
import artworksReducer from "./artworks/artworksSlice";
import searchReduser from "./search/searchSlise";

export const store = configureStore({
  reducer: {
    arworks: artworksReducer,
    search: searchReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
