import { useEffect } from "react";
import { givenOffersAct } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { loading } from "../../assets";
import Offer from "./Offer";

const GivenOffers = ({ token }) => {
  const dispatch = useDispatch();
  const givenOffers = useSelector((state) => state.givenOffers);

  useEffect(() => {
    dispatch(givenOffersAct(token));
    return () => dispatch(givenOffersAct(token, "clear"));
  }, []);

  return (
    <>
      {givenOffers.isLoading && (
        <img className="offers-loading" src={loading} alt="yükleniyor" />
      )}
      {givenOffers.data.map((offer) => (
        <Offer type={"givenOffers"} key={offer.id} {...offer} token={token} />
      ))}
    </>
  );
};

export default GivenOffers;
