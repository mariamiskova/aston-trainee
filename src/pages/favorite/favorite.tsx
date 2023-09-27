import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/card";
import { useAuth } from "../../hooks/useAuth";
import { AppDispatch } from "../../store";
import { favoriteData } from "../../store/favorite/favoriteSelectors";
import {
  clearFavorites,
  removeFavoriteItem,
} from "../../store/favorite/favoriteSlice";
import styles from "./favorite.module.scss";

const Favorite = () => {
  const favoriteItems = useSelector(favoriteData);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  const favoriteCallback = (callbackId: string) => {
    dispatch(removeFavoriteItem(callbackId));
  };

  const handleClearFavoriteClick = () => {
    dispatch(clearFavorites());
  };

  return (
    <div>
      {favoriteItems.length > 0 ? (
        <div>
          <div className={styles.wrapper}>
            {favoriteItems.map((props) => (
              <Card
                favoriteCallback={favoriteCallback}
                {...props}
                itIsFavoritePage
              />
            ))}
          </div>
          <button className={styles.button} onClick={handleClearFavoriteClick}>
            Clear favorites
          </button>
        </div>
      ) : (
        <div className={styles.message}>Favorites is empty</div>
      )}
    </div>
  );
};

export default Favorite;
