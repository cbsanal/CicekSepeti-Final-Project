import { GIVEN_OFFERS } from "../constants";

const offersReceived = (data) => ({
  type: GIVEN_OFFERS.GIVEN_OFFERS_LOADED,
  payload: data,
});

const errorHappened = (err) => ({
  type: GIVEN_OFFERS.GIVEN_OFFERS_ERROR,
  payload: err,
});

const givenOffersClear = () => ({
  type: GIVEN_OFFERS.GIVEN_OFFERS_CLEAR,
});

const givenOffers = (token, type) => async (dispatch) => {
  if (type === "clear") {
    dispatch(givenOffersClear());
    return null;
  }
  const bearer = "Bearer " + token;
  return fetch("https://bootcampapi.techcs.io/api/fe/v1/account/given-offers", {
    method: "GET",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  })
    .then((response) => response.json())
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
      dispatch(offersReceived(offers));
    })
    .catch((error) => dispatch(errorHappened(error)));
};

export default givenOffers;
