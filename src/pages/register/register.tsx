import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
  setError,
  setUser,
} from "../../store/authorization/authorizationSlice";
import styles from "./register.module.scss";
import { userData } from "../../store/authorization/authorizationSelector";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const authData = useSelector(userData);

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.getIdToken(),
          })
        );
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;

        dispatch(setError(errorMessage));
      });
  };

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
        Submit
      </button>
      <Link className={styles.link} to={"/login"}>
        Go to Log in
      </Link>
    </form>
  );
};

export default Register;
