import { CANCEL_OFFER } from "../constants";

const initialState = {
  status: false,
  isError: false,
};

const cancelOfferReducer = (state = initialState, action) => {
  switch (action.type) {
    case CANCEL_OFFER.CANCEL_OFFER_SUCCESS:
      return { ...state, status: true };
    case CANCEL_OFFER.CANCEL_OFFER_PROCESS_OVER:
      return initialState;
    case CANCEL_OFFER.CANCEL_OFFER_ERROR:
      return { ...state, isError: true };
    default:
      return { ...state };
  }
};

export default cancelOfferReducer;
