import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
  setError,
  setUser,
} from "../../store/authorization/authorizationSlice";
import { userData } from "../../store/authorization/authorizationSelector";
import Form from "../../components/form/form";

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
    <Form
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      authData={authData}
      buttonText={"Submit"}
      linkText={"Go to Sign in"}
    />
  );
};

export default Register;
