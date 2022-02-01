import { Outlet } from "react-router-dom";
import Login from "./Login";
import { useContext } from "react";
import AuthContext from "../../context/auth/AuthContext";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
