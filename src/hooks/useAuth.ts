import { useSelector } from "react-redux";
import { RootState } from "redux/types";

export const useAuth = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return isAuthenticated;
};
