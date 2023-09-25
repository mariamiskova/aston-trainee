import React from "react";
import { Link } from "react-router-dom";

import styles from "./header.module.scss";
import Logo from "../ui/icons/logo.svg";
import { useAuth } from "../../hooks/useAuth";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/authorization/authorizationSlice";

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
          <img alt="logo" src={Logo} />
        </Link>
        <div className={styles.link_container}>
          {isAuth ? (
            <>
              <Link className={styles.link} to={"/"}>
                Favorites
              </Link>
              <Link className={styles.link} to={"/"}>
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
