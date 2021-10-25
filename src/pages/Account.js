import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { givenOffersAct } from "../redux/actions";
import { Header, GivenOffers, ReceivedOffers } from "./../components";
import { accountUser } from "../assets";
import { toast } from "react-toastify";
import { Redirect } from "react-router";
import Cookies from "js-cookie";

const Account = () => {
  const dispatch = useDispatch();
  const [showGivenOffers, setShowGivenOffers] = useState(false);
  const buyItem = useSelector((state) => state.buyItem);
  const token = Cookies.get("jwt");

  useEffect(() => {
    if (buyItem.status) {
      toast.success("Ürün başarıyla alındı.");
      dispatch(givenOffersAct(token));
    }
  }, [buyItem.status]);

  return (
    <>
      {!Cookies.get("jwt") && <Redirect to="/login" />}
      <Header />
      <section className="account">
        <div className="account-email">
          <div className="user-icon-wrapper">
            <img src={accountUser} alt="kullanıcı-ikonu" />
          </div>
          <span>{Cookies.get("email")}</span>
        </div>
        <div className="offers-btn-wrapper">
          <button
            className={showGivenOffers ? null : "active"}
            onClick={() => setShowGivenOffers(false)}
          >
            Teklif Aldıklarım
          </button>
          <button
            className={showGivenOffers ? "active" : null}
            onClick={() => setShowGivenOffers(true)}
          >
            Teklif Verdiklerim
          </button>
        </div>
        <div className="straight-line"></div>
        <div className="offers">
          {showGivenOffers && <GivenOffers token={token} />}
          {!showGivenOffers && <ReceivedOffers token={token} />}
        </div>
      </section>
    </>
  );
};

export default Account;
