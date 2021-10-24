import { BUY_ITEM } from "../constants";

const buyItemSuccess = () => ({
  type: BUY_ITEM.BUY_ITEM_SUCCESS,
});

const buyItemError = (err) => ({
  payload: err,
  type: BUY_ITEM.BUY_ITEM_ERROR,
});

const buyItemProcessOver = () => ({
  type: BUY_ITEM.BUY_ITEM_PROCESS_OVER,
});

const buyItemAction = (id, token) => async (dispatch) => {
  const bearer = "Bearer " + token;
  return fetch(
    `https://bootcampapi.techcs.io/api/fe/v1/product/purchase/${id}`,
    {
      method: "PUT",
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    }
  )
    .then((response) => {
      if (response.status === 200) dispatch(buyItemSuccess());
      else if (response.status === 401)
        throw new Error("Lütfen önce giriş yapınız");
      else if (response.status === 404)
        throw new Error("Üzgünüz bu ürün bulunamadı");
      else return response.json();
    })
    .then((data) => {
      if (data) {
        if (data.message === "Cannot purchase your own product!")
          throw new Error("Kendi ürününüzü alamazsınız");
        throw new Error("Bilinmeyen bir hata oluştu");
      }
      dispatch(buyItemProcessOver());
    })
    .catch((err) => {
      dispatch(buyItemError(`${err}`));
      dispatch(buyItemProcessOver());
    });
};

export default buyItemAction;
