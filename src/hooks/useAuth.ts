import { userData } from "./../store/authorization/authorizationSelector";
import { useSelector } from "react-redux";

export function useAuth() {
  const { email, id, token } = useSelector(userData);
  const localStorageAuth = localStorage.getItem("auth");

  if (localStorageAuth) {
    return {
      isAuth: true,
    };
  }

  if (!!email) {
    localStorage.setItem("auth", "true");
  }

  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
}
