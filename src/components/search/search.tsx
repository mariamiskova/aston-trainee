import React from "react";
import styles from "./search.module.scss";

const Search = () => {
  return (
    <form className={styles.search_wrapper}>
      <input className={styles.search_wrapper__input} type="text" />
      <button className={styles.search_wrapper__button}>Search</button>
    </form>
  );
};

export default Search;
