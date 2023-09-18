import React, { useRef } from "react";
import { Grid } from "react-loader-spinner";
import { useSelector } from "react-redux";
import Card from "../../components/card/card";
import Pagination from "../../components/pagination/pagination";
import Search from "../../components/search/search";
import {
  artworks,
  isArtworksLoading,
} from "../../store/artworks/artworksSelectors";

import styles from "./main.module.scss";

const Main = () => {
  const itemsData = useSelector(artworks);
  const isLoading = useSelector(isArtworksLoading);
  const ref = useRef(null);

  return (
    <div className={styles.container}>
      <Search />
      <div style={{ display: "flex", flexWrap: "wrap" }} ref={ref}>
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
            {itemsData.map((data) => (
              <Card key={data.id} {...data} />
            ))}
          </>
        )}
      </div>
      <Pagination ref={ref} />
    </div>
  );
};

export default Main;
