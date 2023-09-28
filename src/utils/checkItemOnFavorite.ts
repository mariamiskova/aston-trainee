import { PictureItem } from "../store/artworks/types";

export const isThisItemOnFavorites = (
  currentId: string,
  favoriteItems: PictureItem[]
) => {
  const haveItem = favoriteItems.find(
    ({ id }) => String(currentId) === String(id)
  );

  if (haveItem) {
    return true;
  }

  return false;
};
