import { FETCH_ITEM_OPTIONS } from "../constants";

const colors = (data) => ({
  type: FETCH_ITEM_OPTIONS.COLOR_OPTIONS_LOADED,
  payload: data,
});

const brand = (data) => ({
  type: FETCH_ITEM_OPTIONS.BRAND_OPTIONS_LOADED,
  payload: data,
});

const status = (data) => ({
  type: FETCH_ITEM_OPTIONS.STATUS_OPTIONS_LOADED,
  payload: data,
});

const category = (data) => ({
  type: FETCH_ITEM_OPTIONS.CATEGORY_OPTIONS_LOADED,
  payload: data,
});

const error = () => ({
  type: FETCH_ITEM_OPTIONS.ITEM_OPTIONS_ERROR,
});

const fetchItemOptionsAct = (type) => async (dispatch) => {
  return fetch(`https://bootcampapi.techcs.io/api/fe/v1/detail/${type}/all`)
    .then((res) => res.json())
    .then((data) => {
      if (type === "color") dispatch(colors(data));
      else if (type === "status") dispatch(status(data));
      else if (type === "category") dispatch(category(data));
      else dispatch(brand(data));
    })
    .catch(() => dispatch(error()));
};

export default fetchItemOptionsAct;
