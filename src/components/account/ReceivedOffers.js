import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receivedOffersAct } from "../../redux/actions";
import { loading } from "../../assets";
import Offer from "./Offer";
import { toast } from "react-toastify";

const ReceivedOffers = ({ token }) => {
  const dispatch = useDispatch();
  const receivedOffers = useSelector((state) => state.receivedOffers);
  const rejectOffer = useSelector((state) => state.rejectOffer);
  const acceptOffer = useSelector((state) => state.acceptOffer);

  useEffect(() => {
    dispatch(receivedOffersAct(token));
    return () => dispatch(receivedOffersAct(token, "clear"));
  }, []);

  useEffect(() => {
    if (rejectOffer.status || acceptOffer.status) {
      toast.success("İşlem başarılı");
      dispatch(receivedOffersAct(token));
    }
  }, [rejectOffer.status, acceptOffer.status]);

  return (
    <>
      {receivedOffers.isLoading && (
        <img className="offers-loading" src={loading} alt="loading-img" />
      )}
      {receivedOffers.data.map((offer) => (
        <Offer
          type={"receivedOffers"}
          key={offer.id}
          {...offer}
          token={token}
        />
      ))}
    </>
  );
};

export default ReceivedOffers;
