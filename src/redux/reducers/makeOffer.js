import { MAKE_OFFER } from "../constants";

const initialState = {
  status: false,
  isError: false,
};

const makeOfferReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_OFFER.MAKE_OFFER_SENDED:
      return { ...state, status: true };
    case MAKE_OFFER.MAKE_OFFER_PROCESS_OVER:
      return initialState;
    case MAKE_OFFER.MAKE_OFFER_ERROR:
      return { ...state, isError: action.payload };
    default:
      return { ...state };
  }
};

export default makeOfferReducer;
