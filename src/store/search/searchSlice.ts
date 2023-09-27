import { fetchSearchArtworks } from "../thunks/search/searchThunks";
import { SearchItem } from "./searchTypes";
import { createSlice } from "@reduxjs/toolkit";

export interface SearchState {
  data: SearchItem[];
  isSearchLoading: boolean;
  searchValue: string;
}

const initialState: SearchState = {
  data: [],
  isSearchLoading: false,
  searchValue: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchArtworks.pending, (state) => {
        state.isSearchLoading = true;
      })
      .addCase(fetchSearchArtworks.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isSearchLoading = false;
        state.searchValue = "";
      });
  },
});

export const { addSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
