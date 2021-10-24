import { ALL_PRODUCTS } from "../constants";

const initialState = {
  data: [],
  isFetching: true,
  isError: false,
};

const fetchAllItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PRODUCTS.ALL_PRODUCTS_LOADED:
      return { ...state, data: action.payload, isFetching: false };
    case ALL_PRODUCTS.ALL_PRODUCTS_ERROR:
      return { ...state, isError: true, isFetching: false };
    case ALL_PRODUCTS.ALL_PRODUCTS_CLEAR:
      return initialState;
    default:
      return { ...state };
  }
};

export default fetchAllItemsReducer;
