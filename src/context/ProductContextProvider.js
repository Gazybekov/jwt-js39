import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { API } from "../helpers/const";
const productContext = createContext();
export const useProduct = () => useContext(productContext);
const ProductContextProvider = ({ children }) => {
  const INIT_STATE = {
    categories: [],
  };
  const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case "GET_CATEGORIES":
        return { ...state, categories: action.payload };
    }
  };
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  //! getConfing
  const getConfing = () => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    const Authorization = `Bearer ${tokens.access.access}`;
    const config = {
      headers: { Authorization },
    };
    return config;
  };

  //! getCategories
  const getCategories = async () => {
    const { data } = await axios(`${API}/category/list/`, getConfing());
    dispatch({
      type: "GET_CATEGORIES",
      payload: data.results,
    });
  };
  //! add
  const addProduct = async (product) => {
    try {
      await axios.post(`${API}/products/`, product, getConfing());
    } catch (error) {
      console.log(error);
    }
  };
  const values = {
    categories: state.categories,
    getCategories,
    addProduct,
  };
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
