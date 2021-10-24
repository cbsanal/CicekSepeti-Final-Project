import { ACCEPT_OFFER } from "../constants";

const initialState = {
  status: false,
  isError: false,
};

const confirmOfferReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCEPT_OFFER.ACCEPT_OFFER_STATUS:
      return { ...state, status: true };
    case ACCEPT_OFFER.ACCEPT_OFFER_PROCESS_OVER:
      return initialState;
    case ACCEPT_OFFER.ACCEPT_OFFER_ERROR:
      return { ...state, isError: true };
    default:
      return { ...state };
  }
};

export default confirmOfferReducer;
