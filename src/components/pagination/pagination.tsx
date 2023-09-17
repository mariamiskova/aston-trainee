import React, {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  RefObject,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { pagination } from "../../store/artworks/artworksSelectors";
import { fetchArtworks } from "../../store/thunks/artworks/artworksThunks";
import classNames from "classnames";

import styles from "./pagination.module.scss";

const getPaginationItems = (
  current: number,
  lastPage: number,
  callbackFetchItems: (page: number) => void
) => {
  const handleClick = (e: SyntheticEvent) => {
    const targetId = (e.target as HTMLLIElement).id;

    if (targetId && Number(targetId) !== current) {
      callbackFetchItems(Number(targetId));
    }
  };

  if (current < 5) {
    return (
      <ul className={styles.pagination_list} onClick={(e) => handleClick(e)}>
        {current === 4 && (
          <li className={styles.pagination_list__item} id="1">
            {1}
          </li>
        )}
        {current - 2 > 0 && (
          <li className={styles.pagination_list__item} id={String(current - 2)}>
            {current - 2}
          </li>
        )}
        {current - 1 > 0 && (
          <li className={styles.pagination_list__item} id={String(current - 1)}>
            {current - 1}
          </li>
        )}
        <li
          className={styles.pagination_list__item}
          style={{ color: "#b50938" }}
          id={String(current)}
        >
          {current}
        </li>
        <li className={styles.pagination_list__item} id={String(current + 1)}>
          {current + 1}
        </li>
        <li className={styles.pagination_list__item} id={String(current + 2)}>
          {current + 2}
        </li>
        <li
          className={classNames([
            styles.pagination_list__item,
            styles.pagination_list__item__dots,
          ])}
        >
          ...
        </li>
        <li className={styles.pagination_list__item} id={String(lastPage)}>
          {lastPage}
        </li>
      </ul>
    );
  }

  if (current >= lastPage - 2) {
    return (
      <ul className={styles.pagination_list} onClick={(e) => handleClick(e)}>
        <li className={styles.pagination_list__item} id="1">
          1
        </li>

        <li
          className={classNames([
            styles.pagination_list__item,
            styles.pagination_list__item__dots,
          ])}
        >
          ...
        </li>
        {current - 2 > 0 && (
          <li className={styles.pagination_list__item} id={String(current - 2)}>
            {current - 2}
          </li>
        )}
        {current - 1 > 0 && (
          <li className={styles.pagination_list__item} id={String(current - 1)}>
            {current - 1}
          </li>
        )}
        <li
          className={styles.pagination_list__item}
          style={{ color: "#b50938" }}
          id={String(current)}
        >
          {current}
        </li>
        {current + 1 <= lastPage && (
          <li className={styles.pagination_list__item} id={String(current + 1)}>
            {current + 1}
          </li>
        )}
        {current + 2 <= lastPage && (
          <li className={styles.pagination_list__item} id={String(current + 2)}>
            {current + 2}
          </li>
        )}
      </ul>
    );
  }

  return (
    <ul className={styles.pagination_list} onClick={(e) => handleClick(e)}>
      <li className={styles.pagination_list__item} id="1">
        1
      </li>
      <li
        className={classNames([
          styles.pagination_list__item,
          styles.pagination_list__item__dots,
        ])}
      >
        ...
      </li>
      <li className={styles.pagination_list__item} id={String(current - 2)}>
        {current - 2}
      </li>
      <li className={styles.pagination_list__item} id={String(current - 1)}>
        {current - 1}
      </li>
      <li
        className={styles.pagination_list__item}
        id={String(current)}
        style={{ color: "#b50938" }}
      >
        {current}
      </li>
      <li className={styles.pagination_list__item} id={String(current + 1)}>
        {current + 1}
      </li>
      <li className={styles.pagination_list__item} id={String(current + 2)}>
        {current + 2}
      </li>
      <li
        className={classNames([
          styles.pagination_list__item,
          styles.pagination_list__item__dots,
        ])}
      >
        ...
      </li>
      <li className={styles.pagination_list__item} id={String(lastPage)}>
        {lastPage}
      </li>
    </ul>
  );
};

const Pagination: ForwardRefExoticComponent<
  RefAttributes<RefObject<HTMLDivElement>>
> = forwardRef((props, ref) => {
  const [page, setPage] = useState<number>(1);

  const dispatch: AppDispatch = useDispatch();

  const paginationData = useSelector(pagination);

  const callbackFetchItems = (page: number) => {
    dispatch(fetchArtworks({ limit: 12, page: page }));
    setPage(() => page);
  };

  const prevPageClick = () => {
    setPage((prev) => {
      if (prev === 1) {
        return prev;
      }
      return prev - 1;
    });
  };

  const nextPageClick = () => {
    setPage((prev) => {
      return prev + 1;
    });
  };

  useEffect(() => {
    callbackFetchItems(page);

    if (ref) {
      (
        (ref as RefObject<HTMLDivElement>).current as HTMLDivElement
      ).scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [page, ref]);

  return (
    <div className={styles.container}>
      <button
        className={classNames([
          styles.pagination_button,
          page <= 1 ? styles.pagination_button__disabled : "",
        ])}
        onClick={prevPageClick}
        disabled={page <= 1}
      >
        Prev
      </button>
      {getPaginationItems(page, paginationData.total_pages, callbackFetchItems)}
      <button
        className={classNames([
          styles.pagination_button,
          page >= paginationData.total_pages
            ? styles.pagination_button__disabled
            : "",
        ])}
        onClick={nextPageClick}
        disabled={page >= paginationData.total_pages}
      >
        Next
      </button>
    </div>
  );
});

export default Pagination;
