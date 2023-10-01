import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

import styles from "./header.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/authorization/authorizationSlice";
import LogoIcon from "../ui/icons/logoIcon/logoIcon";

interface HeaderInterface {
  themeButton: ReactNode;
}

const Header = ({ themeButton }: HeaderInterface) => {
  const { isAuth } = useAuth();
  const dispatch: AppDispatch = useDispatch();

  const handleClick = () => {
    dispatch(removeUser());
    localStorage.clear();
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logo} to={"/"}>
          <LogoIcon />
        </Link>
        {themeButton}
        <div className={styles.link_container}>
          {isAuth ? (
            <>
              <Link className={styles.link} to={"/favorites"}>
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
              <Link className={styles.link} to={"/signin"}>
                Sign in
              </Link>
              <Link className={styles.link} to={"/signup"}>
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
