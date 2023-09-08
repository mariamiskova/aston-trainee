import { RootState } from "..";

export const items = (state: RootState) => state.items.data;
export const pagination = (state: RootState) => state.items.pagination;
