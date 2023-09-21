import React from "react";
import { Link } from "react-router-dom";

import styles from "./header.module.scss";
import Logo from "../ui/icons/logo.svg";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logo} to={"/"}>
          <img alt="logo" src={Logo} />
        </Link>
        <div className={styles.link_container}>
          <Link className={styles.link} to={"/"}>
            Sign in
          </Link>
          <Link className={styles.link} to={"/"}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
