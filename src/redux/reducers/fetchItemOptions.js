import { FETCH_ITEM_OPTIONS } from "../constants";

const initialState = {
  brandOptions: [],
  colorOptions: [],
  statusOptions: [],
  categoryOptions: [],
  isError: false,
};

const fetchItemOptionsRecuder = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEM_OPTIONS.BRAND_OPTIONS_LOADED:
      return { ...state, brandOptions: action.payload };
    case FETCH_ITEM_OPTIONS.CATEGORY_OPTIONS_LOADED:
      return { ...state, categoryOptions: action.payload };
    case FETCH_ITEM_OPTIONS.COLOR_OPTIONS_LOADED:
      return { ...state, colorOptions: action.payload };
    case FETCH_ITEM_OPTIONS.STATUS_OPTIONS_LOADED:
      return { ...state, statusOptions: action.payload };
    case FETCH_ITEM_OPTIONS.ITEM_OPTIONS_ERROR:
      return { ...state, isError: true };
    default:
      return { ...state };
  }
};

export default fetchItemOptionsRecuder;
