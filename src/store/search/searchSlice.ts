import { fetchSearchArtworks } from "../thunks/search/searchThunks";
import { SearchItem } from "./searchTypes";
import { createSlice } from "@reduxjs/toolkit";

export interface SearchState {
  data: SearchItem[];
  searchValue: string;
}

const initialState: SearchState = {
  data: [],
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
    builder.addCase(fetchSearchArtworks.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.searchValue = "";
    });
  },
});

export const { addSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
