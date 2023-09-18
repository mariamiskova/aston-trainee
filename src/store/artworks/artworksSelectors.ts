import { RootState } from "..";

export const artworks = (state: RootState) => state.arworks.data;
export const pagination = (state: RootState) => state.arworks.pagination;
export const detailArtwork = (state: RootState) => state.arworks.detail;
export const isArtworksLoading = (state: RootState) =>
  state.arworks.isLoadingArtworks;
export const isDetailArtworksLoading = (state: RootState) =>
  state.arworks.isLoadingDetailArtwork;
