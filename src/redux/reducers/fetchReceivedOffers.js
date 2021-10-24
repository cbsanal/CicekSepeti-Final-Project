import { RECEIVED_OFFERS } from "../constants";

const initialState = {
  data: [],
  isLoading: true,
  isError: false,
};

const receivedOffersRecuder = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVED_OFFERS.RECEIVED_OFFERS_LOADED:
      return { ...state, data: action.payload, isLoading: false };
    case RECEIVED_OFFERS.RECEIVED_OFFERS_ERROR:
      return { ...state, isError: action.payload, isLoading: false };
    case RECEIVED_OFFERS.RECEIVED_OFFERS_CLEAR:
      return initialState;
    default:
      return { ...state };
  }
};

export default receivedOffersRecuder;
