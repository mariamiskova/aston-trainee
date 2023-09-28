import { RootState } from "..";

export const searchData = (state: RootState) => state.search.data;
export const searchLoading = (state: RootState) => state.search.isSearchLoading;
export const searchValue = (state: RootState) => state.search.searchValue;
