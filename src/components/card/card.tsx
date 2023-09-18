import React from "react";
import { PictureItem } from "../../store/artworks/types";
import classNames from "classnames";
import { imgLoader } from "../../utils/imgLoader";
import styles from "./card.module.scss";
import { Link } from "react-router-dom";

const Card = ({
  id,
  image_id,
  artist_title,
  date_display,
  title,
  artwork_type_title,
}: PictureItem) => {
  return (
    <Link className={styles.container} to={`/${id}`}>
      <img
        className={styles.img}
        src={imgLoader(image_id, "small")}
        alt="painting"
      />
      <div className={styles.overlay}>
        <div
          className={classNames([
            styles.overlay__text,
            styles.overlay__artist_title,
          ])}
        >
          {artist_title}
        </div>
        <div
          className={classNames([
            styles.overlay__text,
            styles.overlay__artwork_type_title,
          ])}
        >
          {artwork_type_title}
        </div>
        <div
          className={classNames([styles.overlay__text, styles.overlay__title])}
        >
          {title}
        </div>
        <div
          className={classNames([
            styles.overlay__text,
            styles.overlay__date_display,
          ])}
        >
          {date_display}
        </div>
      </div>
    </Link>
  );
};

export default Card;
