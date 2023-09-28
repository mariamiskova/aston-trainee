import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch } from "../../store";
import {
  detailArtwork,
  isDetailArtworksLoading,
} from "../../store/artworks/artworksSelectors";
import { fetchDetailArtwork } from "../../store/thunks/artworks/artworksThunks";
import { imgLoader } from "../../utils/imgLoader";
import { Grid } from "react-loader-spinner";

import styles from "./detail.module.scss";
import { favoriteData } from "../../store/favorite/favoriteSelectors";
import {
  addFavoriteItem,
  removeFavoriteItem,
} from "../../store/favorite/favoriteSlice";
import { useAuth } from "../../hooks/useAuth";
import LikeIcon from "../../components/ui/icons/likeIcon/likeIcon";
import CrossIcon from "../../components/ui/icons/crossIcon/crossIcon";

const Detail = () => {
  const { artworkId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { isAuth } = useAuth();

  const detailArtworkData = useSelector(detailArtwork);
  const isLoading = useSelector(isDetailArtworksLoading);
  const favoriteItems = useSelector(favoriteData);

  const isThisItemOnFavorites = useCallback(() => {
    const haveItem = favoriteItems.find(({ id }) => artworkId === String(id));

    if (haveItem) {
      return true;
    }

    return false;
  }, [artworkId, favoriteItems]);

  useEffect(() => {
    if (artworkId) {
      dispatch(fetchDetailArtwork(artworkId));
    }
  }, []);

  const handleRemoveFromFavoritesClick = () => {
    dispatch(removeFavoriteItem(Number(artworkId)));
  };

  const handleAddToFavoritesClick = () => {
    dispatch(addFavoriteItem(detailArtworkData));
  };

  return (
    <div className={styles.imformation_container}>
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
          <div className={styles.container}>
            <img
              className={styles.img}
              src={imgLoader(detailArtworkData.image_id, "normal")}
              alt="painting"
            />

            <div className={styles.artist_title}>
              {detailArtworkData.artist_title}
            </div>
            <div className={styles.artwork_type}>
              {detailArtworkData.artwork_type_title}
            </div>

            <div className={styles.title}>{detailArtworkData.title}</div>
            <div className={styles.date}>{detailArtworkData.date_display}</div>
          </div>

          <div>
            <div className={styles.text}>
              {detailArtworkData.provenance_text}
            </div>
            {isAuth &&
              (isThisItemOnFavorites() ? (
                <button
                  className={styles.dislike}
                  onClick={handleRemoveFromFavoritesClick}
                >
                  <CrossIcon />
                </button>
              ) : (
                <button
                  className={styles.favorite}
                  onClick={handleAddToFavoritesClick}
                >
                  <LikeIcon />
                </button>
              ))}

            <Link className={styles.button} to={"/"}>
              Back to main page
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
