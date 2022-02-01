import { createContext, useReducer } from "react";
import authReducer from "./AuthReducers";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("jwt") || "",
    isLoggedIn: !!localStorage.getItem("jwt") || false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
