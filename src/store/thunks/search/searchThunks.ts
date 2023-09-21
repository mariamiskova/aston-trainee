import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSearchArtworks = createAsyncThunk(
  "search/fetchSearchArtworks",
  async (keywords: string) => {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?q=${keywords}`
    );

    const res = await response.json();
    return res;
  }
);