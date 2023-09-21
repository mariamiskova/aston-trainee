import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../store";
import { searchData } from "../../store/search/searchSelectors";
import { fetchSearchArtworks } from "../../store/thunks/search/searchThunks";
import styles from "./search.module.scss";

const Search = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const searhDatas = useSelector(searchData);

  console.log(searhDatas);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(fetchSearchArtworks(inputValue));
    setIsOpen(() => true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setInputValue(() => e.target.value);
    }
  };

  const handleClick = () => {
    setIsOpen(() => false);
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
            searhDatas.length > 0 &&
            searhDatas.map(({ id, title }) => {
              return (
                <Link
                  to={`/${id}`}
                  className={styles.search_wrapper__container__list__option}
                >
                  {title}
                </Link>
              );
            })}
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
