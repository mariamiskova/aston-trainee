import { configureStore } from "@reduxjs/toolkit";
import artworksReducer from "./artworks/artworksSlice";
import searchReduser from "./search/searchSlice";
import userReduser from './authorization/authorizationSlice'

export const store = configureStore({
  reducer: {
    arworks: artworksReducer,
    search: searchReduser,
    auth: userReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
