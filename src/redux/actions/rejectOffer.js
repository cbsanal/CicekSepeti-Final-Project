import { REJECT_OFFER } from "../constants";

const rejectSended = () => ({
  type: REJECT_OFFER.REJECT_OFFER_STATUS,
});

const rejectError = () => ({
  type: REJECT_OFFER.REJECT_OFFER_ERROR,
});

const rejectProcessOver = () => ({
  type: REJECT_OFFER.REJECT_OFFER_PROCESS_OVER,
});

const rejectOfferAct = (id, token) => async (dispatch) => {
  const bearer = "Bearer " + token;
  return fetch(
    `https://bootcampapi.techcs.io/api/fe/v1/account/reject-offer/${id}`,
    {
      method: "POST",
      withCredentials: true,
      headers: {
        Accept: "*/*",
        Authorization: bearer,
      },
      body: "",
    }
  )
    .then((res) => {
      if (res.status === 201) dispatch(rejectSended());
      else throw new Error("Bilinmeyen hata oluştu");
      dispatch(rejectProcessOver());
    })
    .catch((err) => dispatch(rejectError(err)));
};

export default rejectOfferAct;
