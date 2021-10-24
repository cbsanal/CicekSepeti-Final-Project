import { RECEIVED_OFFERS } from "../constants";

const receivedOffers = (data) => ({
  type: RECEIVED_OFFERS.RECEIVED_OFFERS_LOADED,
  payload: data,
});

const receivedOffersError = (err) => ({
  type: RECEIVED_OFFERS.RECEIVED_OFFERS_ERROR,
  payload: err,
});

const receivedOffersClear = () => ({
  type: RECEIVED_OFFERS.RECEIVED_OFFERS_CLEAR,
});

const fetchReceivedOffers = (token, type) => async (dispatch) => {
  if (type === "clear") {
    dispatch(receivedOffersClear());
    return null;
  }
  const bearer = "Bearer " + token;
  return fetch(
    "https://bootcampapi.techcs.io/api/fe/v1/account/received-offers",
    {
      method: "GET",
      withCredentials: true,
      headers: {
        Accept: "*/*",
        "Content-type": "application/json",
        Authorization: bearer,
      },
    }
  )
    .then((response) => {
      if (response.status === 200) return response.json();
      if (response.status === 401)
        throw new Error("Lütfen önce giriş yapınız.");
      else throw new Error("Bilinmeyen bir hata oluştu.");
    })
    .then((data) => {
      const offers = data.map((offer) => {
        const { id, offeredPrice, status, product } = offer;
        const { id: productId, imageUrl, isSold, title } = product;
        return {
          id,
          offeredPrice,
          status,
          productId,
          imageUrl,
          isSold,
          title,
        };
      });
      dispatch(receivedOffers(offers));
    })
    .catch((err) => dispatch(receivedOffersError(err)));
};

export default fetchReceivedOffers;
