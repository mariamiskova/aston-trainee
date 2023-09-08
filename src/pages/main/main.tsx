import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/card/card";
import Pagination from "../../components/pagination/pagination";
import Search from "../../components/search/search";
import { items } from "../../store/items/itemsSelectors";

import styles from "./main.module.scss";

const Main = () => {
  const itemsData = useSelector(items);
  const ref = useRef(null);

  useEffect(() => {}, [itemsData]);

  return (
    <div className={styles.container}>
      <Search />
      <div style={{ display: "flex", flexWrap: "wrap" }} ref={ref}>
        {itemsData.map((data) => (
          <Card key={data.id} {...data} />
        ))}
      </div>
      <Pagination ref={ref} />
    </div>
  );
};

export default Main;
