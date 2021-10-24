import { useEffect, useState } from "react";
import { close, tick } from "../../assets";
import { makeOfferAct, givenOffersAct } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const OfferModal = ({ img, title, price, setShowOfferModal, id, token }) => {
  const dispatch = useDispatch();
  const offer = useSelector((state) => state.makeOffer);
  const [offerValue, setOfferValue] = useState("");
  const [options, setOptions] = useState({
    o1: false,
    o2: false,
    o3: false,
  });
  let offeredPrice = null;

  useEffect(() => {
    if (offer.status) {
      setShowOfferModal(false);
      dispatch(givenOffersAct(token));
      toast.success("Teklif yapıldı, bol şans.");
    }
  }, [offer.status]);

  useEffect(() => {
    if (offer.isError) toast.error(offer.isError);
  }, [offer.isError]);

  const setOptionStatus = (o1, o2, o3) => {
    setOptions({ o1, o2, o3 });
    setOfferValue("");
  };

  const offerMade = () => {
    if (options.o1) offeredPrice = Math.floor((price * 2) / 10);
    else if (options.o2) offeredPrice = Math.floor((price * 3) / 10);
    else if (options.o3) offeredPrice = Math.floor((price * 4) / 10);
    else offeredPrice = parseInt(offerValue);
    if (offeredPrice === 0) toast.error("0 TL teklif edemezsin");
    else dispatch(makeOfferAct(id, offeredPrice));
  };

  return (
    <section className="offer-modal">
      <div className="offer-container">
        <header className="offer-modal-top">
          <span>Teklif Ver</span>
          <img
            onClick={() => setShowOfferModal(false)}
            src={close}
            alt="kapat"
          />
        </header>
        <div className="offer-item">
          <div className="item-container">
            <img className="item-img" src={img} alt="ürün-resmi" />
            <span>{title}</span>
          </div>
          <span>{price} TL</span>
        </div>
        <div
          onClick={() => setOptionStatus(!options.o1, false, false)}
          className={options.o1 ? "option option-active" : "option"}
        >
          <div className="input">
            <img
              className={options.o1 ? "show" : "hide"}
              src={tick}
              alt="tick-img"
            />
          </div>
          <span>%20'si Kadar Teklif Ver</span>
        </div>
        <div
          onClick={() => setOptionStatus(false, !options.o2, false)}
          className={options.o2 ? "option option-active" : "option"}
        >
          <div className="input">
            <img
              className={options.o2 ? "show" : "hide"}
              src={tick}
              alt="tick-img"
            />
          </div>
          <span>%30'u Kadar Teklif Ver</span>
        </div>
        <div
          onClick={() => setOptionStatus(false, false, !options.o3)}
          className={options.o3 ? "option option-active" : "option"}
        >
          <div className="input">
            <img
              className={options.o3 ? "show" : "hide"}
              src={tick}
              alt="tick-img"
            />
          </div>
          <span>%40'ı Kadar Teklif Ver</span>
        </div>
        <div className="custom-offer">
          <input
            type="text"
            placeholder="Teklif Belirle"
            value={offerValue}
            onChange={(e) => {
              setOfferValue(e.target.value.replace(/\D/, ""));
              setOptions({ o1: false, o2: false, o3: false });
            }}
          />
          <span>TL</span>
        </div>
        <button onClick={offerMade} className="confirm-offer">
          Onayla
        </button>
      </div>
    </section>
  );
};

export default OfferModal;
