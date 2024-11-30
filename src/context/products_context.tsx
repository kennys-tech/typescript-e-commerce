import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";
// import { featuredProducts, productData } from '../utils/productData'
import { productDataType } from "../utils/productData";
import { API_ENDPOINT, QUERY } from "../utils/constants";
import axios from "axios";

export type initialStateType = {
  isSidebarOpen: boolean;
  allProducts: productDataType[] | [];
  featuredProducts: productDataType[] | [];
  singleProduct: productDataType | {};
  openSidebar: () => void;
  closeSidebar: () => void;
  fetchSingleProduct: (id: string) => void;
  productsLoading: boolean;
  productsError: boolean;
  singleProductLoading: boolean;
  singleProductError: boolean;
};

const initialState: initialStateType = {
  isSidebarOpen: false,
  allProducts: [],
  featuredProducts: [],
  singleProduct: {},
  openSidebar: () => {},
  closeSidebar: () => {},
  fetchSingleProduct: (id: string) => {},
  productsLoading: false,
  productsError: false,
  singleProductLoading: false,
  singleProductError: false,
};

const ProductsContext = React.createContext<initialStateType>(initialState);

export const ProductsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const fetchSingleProduct = (slug: string) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const singleProduct: productDataType = state.allProducts.filter(
        (product: productDataType) => product.slug === slug
      )[0];
      if (singleProduct) {
        dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: GET_PRODUCTS_BEGIN });
      try {
        const queryResult = await axios.post(API_ENDPOINT, { query: QUERY });
        const result = queryResult.data.data.allProduct;
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: result });
      } catch (error) {
        console.log(error);
        dispatch({ type: GET_PRODUCTS_ERROR });
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
