import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
export const useLogout = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const logout = () => {
    //remove user from storage
    localStorage.removeItem("mwb-user");

    //update the global state
    dispatch({ type: "LOGOUT" });

    navigate("/", { replace: true });
  };
  return { logout };
};