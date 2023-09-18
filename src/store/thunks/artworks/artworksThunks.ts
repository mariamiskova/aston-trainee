import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchArtworks = createAsyncThunk(
  "artworks/fetchItems",
  async (params: { limit: number; page: number }) => {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks?page=${params.page}&limit=${params.limit}`
    );

    const res = await response.json();
    return res;
  }
);

export const fetchDetailArtwork = createAsyncThunk(
  "artworks/fetchDetailArtwork",
  async (id: string) => {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);

    const res = await response.json();
    return res;
  }
);
