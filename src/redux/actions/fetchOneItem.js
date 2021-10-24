import { ONE_PRODUCT } from "../constants";

const dataLoaded = (data) => ({
  type: ONE_PRODUCT.ONE_PRODUCT_LOADED,
  payload: data,
});

const dataLoadingError = (error) => ({
  type: ONE_PRODUCT.ONE_PRODUCT_ERROR,
  payload: error,
});

const itemDataClear = () => ({
  type: ONE_PRODUCT.ONE_PRODUCT_CLEAR,
});

const fetchItemDetails = (id, type) => async (dispatch) => {
  if (type === "clear") {
    dispatch(itemDataClear());
    return null;
  }
  return fetch(`https://bootcampapi.techcs.io/api/fe/v1/product/${id}`)
    .then((response) => {
      if (response.status === 200) return response.json();
      else if (response.status === 429) throw new Error("İstek limit aşıldı");
      else throw new Error("Bilinmeyen hata oluştu");
    })
    .then((data) => dispatch(dataLoaded(data)))
    .catch((error) => {
      dispatch(dataLoadingError(error));
    });
};

export default fetchItemDetails;
