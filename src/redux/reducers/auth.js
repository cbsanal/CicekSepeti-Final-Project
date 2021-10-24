import { AUTH_STATUS } from "../constants";
import Cookies from "js-cookie";

const initialState = {
  isFetching: false,
  isError: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_STATUS.AUTH_STATUS_TOKEN_FETCHING:
      return { ...state, isFetching: true, isError: false };
    case AUTH_STATUS.AUTH_STATUS_TOKEN_FOUND:
      Cookies.set("jwt", action.payload);
      return { ...state, isFetching: false };
    case AUTH_STATUS.AUTH_STATUS_TOKEN_ERROR:
      return { ...state, isError: action.payload, isFetching: false };
    default:
      return { ...state };
  }
};

export default authReducer;
