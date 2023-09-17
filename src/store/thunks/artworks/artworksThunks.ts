import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchArtworks = createAsyncThunk(
  "items/fetchItems",
  async (params: { limit: number; page: number }) => {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks?page=${params.page}&limit=${params.limit}`
    );

    const res = await response.json();
    return res;
  }
);
