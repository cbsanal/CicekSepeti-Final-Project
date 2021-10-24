import { ALL_PRODUCTS } from "../constants";

const dataLoaded = (data) => ({
  type: ALL_PRODUCTS.ALL_PRODUCTS_LOADED,
  payload: data,
});

const dataLoadingError = (error) => ({
  type: ALL_PRODUCTS.ALL_PRODUCTS_ERROR,
  payload: error,
});

const dataClear = () => ({
  type: ALL_PRODUCTS.ALL_PRODUCTS_CLEAR,
});

const fetchAllItems = (type) => async (dispatch) => {
  if (type === "clear") {
    dispatch(dataClear());
    return null;
  }
  return fetch("https://bootcampapi.techcs.io/api/fe/v1/product/all")
    .then((response) => {
      if (response.status === 200) return response.json();
      else throw new Error("Bilinmeyen bir sorun oluştu");
    })
    .then((data) => dispatch(dataLoaded(data)))
    .catch((error) => dispatch(dataLoadingError(error)));
};

export default fetchAllItems;
