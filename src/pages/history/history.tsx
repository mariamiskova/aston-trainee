import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AppDispatch } from "../../store";
import { historyData } from "../../store/history/historySelectors";
import {
  clearHistory,
  removeHistoryItem,
} from "../../store/history/historySlice";
import { addSearchValue } from "../../store/search/searchSlice";
import styles from "./history.module.scss";

const History = () => {
  const historyList = useSelector(historyData);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (!isAuth) {
      navigate("/register");
    }
  }, [isAuth]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const historyItemId = (e.target as HTMLDivElement).id;

    if (historyItemId) {
      dispatch(removeHistoryItem(historyItemId));
    }
  };

  const handleClearHistoryClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    dispatch(clearHistory());
  };

  const handleHistoryItemClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.currentTarget !== e.target) {
      return;
    }
    e.stopPropagation();

    const historyItemId = e.currentTarget.id;

    if (historyItemId) {
      dispatch(addSearchValue(e.currentTarget.id));
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      {historyList.length > 0 ? (
        <div onClick={handleClick}>
          {historyList.map((item) => (
            <div className={styles.item} key={item}>
              <div
                className={styles.item_title}
                onClick={handleHistoryItemClick}
                id={item}
              >
                {item}
              </div>
              <button className={styles.item_button} id={item}>
                x
              </button>
            </div>
          ))}
          <button className={styles.button} onClick={handleClearHistoryClick}>
            Clear history
          </button>
        </div>
      ) : (
        <div className={styles.message}>History is empty</div>
      )}
    </div>
  );
};

export default History;
