import { createSlice } from "@reduxjs/toolkit";
import { PaginationItem, PictureItem } from "./types";
import {
  fetchArtworks,
  fetchDetailArtwork,
} from "../thunks/artworks/artworksThunks";

export interface ArtworksState {
  data: PictureItem[];
  pagination: PaginationItem;
  detail: PictureItem;
  isLoadingArtworks: boolean;
  isLoadingDetailArtwork: boolean;
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
  detail: {
    id: "",
    image_id: "",
    artist_title: "",
    artwork_type_title: "",
    date_display: "",
    title: "",
    provenance_text: "",
  },
  isLoadingArtworks: false,
  isLoadingDetailArtwork: false,
};

export const artworksSlice = createSlice({
  name: "artworks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtworks.pending, (state, action) => {
        state.isLoadingArtworks = true;
      })
      .addCase(
        fetchArtworks.fulfilled,
        (state, action: { payload: ArtworksState; type: string }) => {
          state.data = action.payload.data;
          state.pagination = action.payload.pagination;
          state.isLoadingArtworks = false;
        }
      )
      .addCase(fetchDetailArtwork.pending, (state, action) => {
        state.isLoadingDetailArtwork = true;
      })
      .addCase(
        fetchDetailArtwork.fulfilled,
        (state, action: { payload: { data: PictureItem }; type: string }) => {
          state.detail = { ...action.payload.data };
          state.isLoadingDetailArtwork = false;
        }
      );
  },
});

export default artworksSlice.reducer;
