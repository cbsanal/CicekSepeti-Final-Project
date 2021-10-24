import { ONE_PRODUCT } from "../constants";

const initialState = {
  data: {},
  isFetching: true,
  isError: false,
};

const oneItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ONE_PRODUCT.ONE_PRODUCT_LOADED:
      return { ...state, data: action.payload, isFetching: false };
    case ONE_PRODUCT.ONE_PRODUCT_ERROR:
      return { ...state, isError: action.payload, isFetching: false };
    case ONE_PRODUCT.ONE_PRODUCT_CLEAR:
      return initialState;
    default:
      return { ...state };
  }
};

export default oneItemReducer;
