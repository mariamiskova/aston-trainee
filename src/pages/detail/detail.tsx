import React, { useCallback, useEffect, useState } from "react";
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

const Detail = () => {
  const { artworkId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const [hover, setHover] = useState<boolean>(false);
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

  const handleMouseEnter = () => {
    setHover(() => true);
  };
  const handleMouseLeave = () => {
    setHover(() => false);
  };

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
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24 2L2 24"
                      stroke="white"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2 2L24 24"
                      stroke="white"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  className={styles.favorite}
                  onClick={handleAddToFavoritesClick}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <svg
                    width="35"
                    height="31"
                    viewBox="0 0 35 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M31.4554 3.56381C30.6491 2.75101 29.6917 2.10624 28.638 1.66633C27.5842 1.22642 26.4548 1 25.3142 1C24.1736 1 23.0442 1.22642 21.9905 1.66633C20.9367 2.10624 19.9794 2.75101 19.173 3.56381L17.4996 5.24987L15.8261 3.56381C14.1974 1.92278 11.9883 1.00085 9.68495 1.00085C7.38156 1.00085 5.17251 1.92278 3.54376 3.56381C1.91502 5.20485 1 7.43057 1 9.75134C1 12.0721 1.91502 14.2978 3.54376 15.9389L5.2172 17.6249L17.4996 30L29.782 17.6249L31.4554 15.9389C32.2621 15.1265 32.902 14.1619 33.3387 13.1002C33.7753 12.0385 34 10.9005 34 9.75134C34 8.60214 33.7753 7.46419 33.3387 6.40251C32.902 5.34083 32.2621 4.37623 31.4554 3.56381Z"
                      stroke={hover ? "#b50938" : "white"}
                      stroke-opacity="0.8"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
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
