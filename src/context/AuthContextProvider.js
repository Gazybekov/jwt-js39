import axios from "axios";
import React, { createContext, useContext } from "react";
import { API } from "../helpers/const";
import { useNavigate } from "react-router-dom";
const authContext = createContext();
export const useAuth = () => useContext(authContext);
const AuthContextProvider = ({ children }) => {
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
  const handleLogin = async (formData) => {
    try {
      const { data } = await axios.post(`${API}/account/login/`, formData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const values = {
    handleRegister,
    handleLogin,
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
