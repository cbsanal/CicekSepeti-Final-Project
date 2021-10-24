import { MAKE_OFFER } from "../constants";
import Cookies from "js-cookie";

const offerSended = () => ({
  type: MAKE_OFFER.MAKE_OFFER_SENDED,
});

const processOver = () => ({
  type: MAKE_OFFER.MAKE_OFFER_PROCESS_OVER,
});

const offerError = (error) => ({
  type: MAKE_OFFER.MAKE_OFFER_ERROR,
  payload: error,
});

const makeOffer = (id, offeredPrice) => async (dispatch) => {
  const token = Cookies.get("jwt");
  const bearer = "Bearer " + token;
  return fetch(`https://bootcampapi.techcs.io/api/fe/v1/product/offer/${id}`, {
    method: "POST",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    body: JSON.stringify({
      offeredPrice: offeredPrice,
    }),
  })
    .then((res) => {
      if (res.status === 201) dispatch(offerSended());
      if (res.status === 400) return res.json();
    })
    .then((data) => {
      if (data) {
        if (data.message === "Cannot offer to your own product!")
          throw new Error("Kendi ürününe teklif veremezsin");
        throw new Error("Bilinmeyen bir hata oluştu");
      }
      dispatch(processOver());
    })
    .catch((err) => {
      dispatch(offerError(`${err}`));
      dispatch(processOver());
    });
};

export default makeOffer;
