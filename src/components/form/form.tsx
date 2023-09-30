import React, { memo } from "react";
import { Link } from "react-router-dom";
import { UserState } from "../../store/authorization/authorizationSlice";
import styles from "./form.module.scss";

interface FormInterface {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  authData: UserState;
  buttonText: string;
  linkText: string;
}

const Form = memo(
  ({
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    authData,
    buttonText,
    linkText,
  }: FormInterface) => {
    return (
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <input
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <input
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        {authData.error && <div className={styles.error}>{authData.error}</div>}
        <button className={styles.button} type="submit">
          {buttonText}
        </button>
        <Link className={styles.link} to={"/register"}>
          {linkText}
        </Link>
      </form>
    );
  }
);

export default Form;
