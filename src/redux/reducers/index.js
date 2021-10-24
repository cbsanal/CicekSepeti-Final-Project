import { combineReducers } from "redux";
import fetchEveryItem from "./fetchEveryItem";
import fetchOneItem from "./fetchOneItem";
import auth from "./auth";
import makeOffer from "./makeOffer";
import givenOffers from "./fetchGivenOffers";
import cancelOffer from "./cancelOffer";
import buyItem from "./buyItem";
import receivedOffers from "./fetchReceivedOffers";
import fetchItemOptions from "./fetchItemOptions";
import addNewItem from "./addNewItem";
import rejectOffer from "./rejectOffer";
import confirmOffer from "./confirmOffer";

const reducers = combineReducers({
  products: fetchEveryItem,
  oneProduct: fetchOneItem,
  auth: auth,
  makeOffer: makeOffer,
  givenOffers: givenOffers,
  cancelOffer: cancelOffer,
  buyItem: buyItem,
  receivedOffers: receivedOffers,
  itemOptions: fetchItemOptions,
  newItem: addNewItem,
  rejectOffer: rejectOffer,
  acceptOffer: confirmOffer,
});

export default reducers;
