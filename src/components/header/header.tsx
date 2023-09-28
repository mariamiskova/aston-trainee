import React from "react";
import { Link } from "react-router-dom";

import styles from "./header.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/authorization/authorizationSlice";
import LogoIcon from "../ui/icons/logoIcon/logoIcon";

const Header = () => {
  const { isAuth } = useAuth();
  const dispatch: AppDispatch = useDispatch();

  const handleClick = () => {
    dispatch(removeUser());
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logo} to={"/"}>
          <LogoIcon />
        </Link>
        <div className={styles.link_container}>
          {isAuth ? (
            <>
              <Link className={styles.link} to={"/favorite"}>
                Favorites
              </Link>
              <Link className={styles.link} to={"/history"}>
                History
              </Link>
              <button className={styles.button} onClick={handleClick}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link className={styles.link} to={"/login"}>
                Sign in
              </Link>
              <Link className={styles.link} to={"/register"}>
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
