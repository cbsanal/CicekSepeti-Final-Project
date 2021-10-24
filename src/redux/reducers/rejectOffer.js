import { REJECT_OFFER } from "../constants";

const initialState = {
  status: false,
  isError: false,
};

const rejectOfferReducer = (state = initialState, action) => {
  switch (action.type) {
    case REJECT_OFFER.REJECT_OFFER_STATUS:
      return { ...state, status: true };
    case REJECT_OFFER.REJECT_OFFER_PROCESS_OVER:
      return initialState;
    case REJECT_OFFER.REJECT_OFFER_ERROR:
      return { ...state, isError: true };
    default:
      return { ...state };
  }
};

export default rejectOfferReducer;
