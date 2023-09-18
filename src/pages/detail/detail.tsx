import React, { useEffect } from "react";
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

const Detail = () => {
  const { artworkId } = useParams();
  const dispatch: AppDispatch = useDispatch();

  const detailArtworkData = useSelector(detailArtwork);
  const isLoading = useSelector(isDetailArtworksLoading);

  useEffect(() => {
    if (artworkId) {
      dispatch(fetchDetailArtwork(artworkId));
    }
  }, []);

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
