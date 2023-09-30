import React, { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../store";
import { addHistoryItem } from "../../store/history/historySlice";
import {
  searchData,
  searchLoading,
  searchValue,
} from "../../store/search/searchSelectors";
import { fetchSearchArtworks } from "../../store/thunks/search/searchThunks";
import styles from "./search.module.scss";

const Search = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const searhDatas = useSelector(searchData);
  const searchValueData = useSelector(searchValue);
  const isSearchLoading = useSelector(searchLoading);

  useEffect(() => {
    if (searchValueData && searchValueData !== inputValue) {
      setInputValue(() => searchValueData);
      setIsOpen(() => true);

      dispatch(fetchSearchArtworks(searchValueData));
    }
  }, [searchValueData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue) {
      dispatch(fetchSearchArtworks(inputValue));
      dispatch(addHistoryItem(inputValue));
      setIsOpen(() => true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setInputValue(() => e.target.value);
    }
  };

  const handleClick = () => {
    setIsOpen(() => false);
    setInputValue(() => "");
  };

  return (
    <form className={styles.search_wrapper} onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.search_wrapper__container}>
        <input
          className={styles.search_wrapper__container__input}
          type="text"
          onChange={(e) => handleChange(e)}
          value={inputValue}
        />

        <div className={styles.search_wrapper__container__list}>
          {isOpen &&
            (isSearchLoading ? (
              <div className={styles.loader}>
                <Grid
                  height="60"
                  width="60"
                  color="#b50938"
                  ariaLabel="grid-loading"
                  radius="12.5"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : (
              searhDatas.length > 0 &&
              searhDatas.map(({ id, title }) => {
                return (
                  <Link
                    to={`/${id}`}
                    className={styles.search_wrapper__container__list__option}
                    key={id}
                  >
                    {title}
                  </Link>
                );
              })
            ))}
        </div>
      </div>
      <button className={styles.search_wrapper__button} type="submit">
        Search
      </button>
      <div className={styles.overlay} onClick={handleClick} />
    </form>
  );
};

export default Search;
