import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { API } from "../helpers/const";
import { useNavigate } from "react-router-dom";
const authContext = createContext();
export const useAuth = () => useContext(authContext);
const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  // ! resgister
  const handleRegister = async (formData) => {
    try {
      await axios.post(`${API}/account/register/`, formData);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  //! login
  const handleLogin = async (formData, email) => {
    try {
      const { data } = await axios.post(`${API}/account/login/`, formData);
      localStorage.setItem("tokens", JSON.stringify(data));
      localStorage.setItem("email", JSON.stringify(email));
      setCurrentUser(email);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  //! checkAuth
  const checkAuth = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const { data } = await axios.post(`${API}/account/token/refresh/`, {
        refresh: tokens.refresh,
      });
      console.log(data);
      localStorage.setItem(
        "tokens",
        JSON.stringify({ access: data, refresh: tokens.refresh })
      );
      const email = JSON.parse(localStorage.getItem("email"));
      setCurrentUser(email);
    } catch (error) {
      console.log(error);
    }
  };
  //! logout
  const handleLogOut = () => {
    localStorage.removeItem("tokens");
    localStorage.removeItem("email");
    setCurrentUser(null);
    navigate("/login");
  };

  const values = {
    handleRegister,
    handleLogin,
    currentUser,
    checkAuth,
    handleLogOut,
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
