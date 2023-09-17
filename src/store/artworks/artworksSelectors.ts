import { RootState } from "..";

export const items = (state: RootState) => state.arworks.data;
export const pagination = (state: RootState) => state.arworks.pagination;
