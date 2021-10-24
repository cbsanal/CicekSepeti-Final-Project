import Cookies from "js-cookie";
import { ADD_ITEM } from "../constants";

const addedItem = () => ({
  type: ADD_ITEM.ADD_ITEM_LOADED,
});

const loadingItem = () => ({
  type: ADD_ITEM.ADD_ITEM_LOADING,
});

const errorLoadingItem = (err) => ({
  type: ADD_ITEM.ADD_ITEM_ERROR,
  payload: err,
});

const resetItem = () => ({
  type: ADD_ITEM.ADD_ITEM_RESET,
});

const addItemAct = (data, type) => async (dispatch) => {
  if (type === "clear") {
    dispatch(resetItem());
    return null;
  }
  const token = Cookies.get("jwt");
  const bearer = "Bearer " + token;
  dispatch(loadingItem());
  return fetch("https://bootcampapi.techcs.io/api/fe/v1/product/create", {
    method: "POST",
    withCredentials: true,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    body: JSON.stringify({
      price: data.price,
      imageUrl: data.imageUrl,
      title: data.title,
      status: data.status,
      color: data.color,
      brand: data.brand,
      category: data.category,
      description: data.description,
      isOfferable: data.isOfferable,
    }),
  })
    .then((response) => {
      if (response.status === 201) dispatch(addedItem());
      else if (response.status === 401)
        throw new Error("Lütfen önce giriş yapın.");
      else throw new Error("Bilinmeyen bir sorun oluştu.");
    })
    .catch((err) => dispatch(errorLoadingItem(err)));
};

export default addItemAct;
