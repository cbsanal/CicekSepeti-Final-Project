import { BUY_ITEM } from "../constants";

const initialState = {
  status: false,
  isError: false,
};

const buyItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_ITEM.BUY_ITEM_SUCCESS:
      return { ...state, status: true };
    case BUY_ITEM.BUY_ITEM_PROCESS_OVER:
      return initialState;
    case BUY_ITEM.BUY_ITEM_ERROR:
      return { ...state, isError: action.payload };
    default:
      return { ...state };
  }
};

export default buyItemReducer;
