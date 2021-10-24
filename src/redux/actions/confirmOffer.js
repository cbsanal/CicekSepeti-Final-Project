import { ACCEPT_OFFER } from "../constants";

const acceptSended = () => ({
  type: ACCEPT_OFFER.ACCEPT_OFFER_STATUS,
});

const acceptError = () => ({
  type: ACCEPT_OFFER.ACCEPT_OFFER_ERROR,
});

const acceptProcessOver = () => ({
  type: ACCEPT_OFFER.ACCEPT_OFFER_PROCESS_OVER,
});

const acceptOfferAct = (id, token) => async (dispatch) => {
  const bearer = "Bearer " + token;
  return fetch(
    `https://bootcampapi.techcs.io/api/fe/v1/account/accept-offer/${id}`,
    {
      method: "PUT",
      withCredentials: true,
      headers: {
        Accept: "*/*",
        Authorization: bearer,
      },
      body: "",
    }
  )
    .then((res) => {
      if (res.status === 200) dispatch(acceptSended());
      else throw new Error("Bilinmeyen hata oluştu");
      dispatch(acceptProcessOver());
    })
    .catch((err) => dispatch(acceptError(err)));
};

export default acceptOfferAct;
