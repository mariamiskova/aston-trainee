import { createSlice } from "@reduxjs/toolkit";
import { PaginationItem, PictureItem } from "./types";
import { fetchArtworks } from "../thunks/artworks/artworksThunks";

export interface ArtworksState {
  data: PictureItem[];
  pagination: PaginationItem;
}

const initialState: ArtworksState = {
  data: [],
  pagination: {
    current_page: 1,
    limit: 9,
    offset: 0,
    total: 0,
    total_pages: 0,
  },
};

export const artworksSlice = createSlice({
  name: "artworks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchArtworks.fulfilled,
      (state, action: { payload: ArtworksState; type: string }) => {
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      }
    );
  },
});

export default artworksSlice.reducer;
