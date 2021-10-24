import { ADD_ITEM } from "../constants";

const initialState = {
  status: false,
  isLoading: false,
  isError: false,
};

const addNewItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM.ADD_ITEM_LOADING:
      return { ...state, status: false, isLoading: true, isError: false };
    case ADD_ITEM.ADD_ITEM_LOADED:
      return { ...state, status: true, isLoading: false };
    case ADD_ITEM.ADD_ITEM_ERROR:
      return { ...state, isError: action.payload, isLoading: false };
    case ADD_ITEM.ADD_ITEM_RESET:
      return initialState;
    default:
      return { ...state };
  }
};

export default addNewItemReducer;
