import React, { useRef } from "react";
import { Grid } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/card/card";
import Pagination from "../../components/pagination/pagination";
import Search from "../../components/search/search";
import LikeIcon from "../../components/ui/icons/likeIcon/likeIcon";
import SelectedIcon from "../../components/ui/icons/selectedIcon/selectedIcon";
import { AppDispatch } from "../../store";
import {
  artworks,
  isArtworksLoading,
} from "../../store/artworks/artworksSelectors";
import { favoriteData } from "../../store/favorite/favoriteSelectors";
import { addFavoriteItem } from "../../store/favorite/favoriteSlice";
import { isThisItemOnFavorites } from "../../utils/checkItemOnFavorite";

import styles from "./main.module.scss";

const Main = () => {
  const itemsData = useSelector(artworks);
  const isLoading = useSelector(isArtworksLoading);
  const favoriteItems = useSelector(favoriteData);
  const dispatch: AppDispatch = useDispatch();

  const ref = useRef(null);

  const favoriteCallback = (callbackId: string) => {
    const favoriteItem = itemsData.find(({ id }) => id === callbackId);

    if (favoriteItem) {
      dispatch(addFavoriteItem(favoriteItem));
    }
  };

  return (
    <div className={styles.container} ref={ref}>
      <Search />
      <div className={styles.wrapper}>
        {isLoading ? (
          <div className={styles.loader}>
            <Grid
              height="80"
              width="80"
              color="#b50938"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <>
            {itemsData.map((data) => (
              <Card
                favoriteCallback={favoriteCallback}
                key={data.id}
                buttonIcon={
                  isThisItemOnFavorites(data.id, favoriteItems) ? (
                    <SelectedIcon />
                  ) : (
                    <LikeIcon />
                  )
                }
                disabledButton={isThisItemOnFavorites(data.id, favoriteItems)}
                {...data}
              />
            ))}
          </>
        )}
      </div>
      <Pagination ref={ref} />
    </div>
  );
};

export default Main;
