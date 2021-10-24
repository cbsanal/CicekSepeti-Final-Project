import { CANCEL_OFFER } from "../constants";

const canceledOffer = () => ({
  type: CANCEL_OFFER.CANCEL_OFFER_SUCCESS,
});
const errorHappened = (err) => ({
  payload: err,
  type: CANCEL_OFFER.CANCEL_OFFER_ERROR,
});

const processOver = () => ({
  type: CANCEL_OFFER.CANCEL_OFFER_PROCESS_OVER,
});

const cancelOffer = (id, token) => async (dispatch) => {
  const bearer = "Bearer " + token;
  return fetch(
    `https://bootcampapi.techcs.io/api/fe/v1/account/cancel-offer/${id}`,
    {
      method: "DELETE",
      withCredentials: true,
      headers: {
        Authorization: bearer,
      },
    }
  )
    .then((response) => {
      if (response.status === 200) dispatch(canceledOffer());
      else throw new Error("Bilinmeyen hata oluştu.");
      dispatch(processOver());
    })
    .catch((err) => dispatch(errorHappened(err)));
};

export default cancelOffer;
