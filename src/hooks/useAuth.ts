import { userData } from "./../store/authorization/authorizationSelector";
import { useSelector } from "react-redux";

export function useAuth() {
  const { email, id, token } = useSelector(userData);

  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
}
