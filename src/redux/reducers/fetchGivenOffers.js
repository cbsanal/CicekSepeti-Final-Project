import { GIVEN_OFFERS } from "../constants";

const initialState = {
  data: [],
  isLoading: true,
  isError: false,
};

const givenOffersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GIVEN_OFFERS.GIVEN_OFFERS_LOADED:
      return { ...state, data: action.payload, isLoading: false };
    case GIVEN_OFFERS.GIVEN_OFFERS_ERROR:
      return { ...state, isError: action.payload, isLoading: false };
    case GIVEN_OFFERS.GIVEN_OFFERS_CLEAR:
      return initialState;
    default:
      return { ...state };
  }
};

export default givenOffersReducer;
