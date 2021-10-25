import { useDispatch } from "react-redux";
import {
  buyItemAct,
  rejectOfferAct,
  acceptOfferAct,
} from "../../redux/actions";

const Offer = (props) => {
  const dispatch = useDispatch();
  const { imageUrl, title, offeredPrice, status, isSold, productId } = props;
  const { token, type, id } = props;

  const buttonRender = () => {
    if (isSold) return <span className="item-sold">Ürün satıldı</span>;
    if (status === "rejected")
      return <span className="rejected">Reddedildi</span>;
    if (type === "givenOffers") {
      if (status === "offered")
        return <span className="answer-waiting">Cevap bekleniyor</span>;
      else
        return (
          <>
            <button
              onClick={() => dispatch(buyItemAct(productId, token))}
              className="offered-item-buy-btn"
            >
              Satın Al
            </button>
            <span className="confirm">Onaylandı</span>
          </>
        );
    } else {
      if (status === "offered") {
        return (
          <>
            <button
              onClick={() => dispatch(acceptOfferAct(id, token))}
              className="confirm-btn"
            >
              Onayla
            </button>
            <button
              onClick={() => dispatch(rejectOfferAct(id, token))}
              className="reject-btn"
            >
              Reddet
            </button>
          </>
        );
      } else {
        return <span className="confirm">Onaylandı</span>;
      }
    }
  };

  return (
    <div className="offered-item-container">
      <div className="img-wrapper">
        <img src={imageUrl} alt="ürün-resmi" />
      </div>
      <div className="item-info">
        <div className="offered-item">
          <span>{title}</span>
          <span className="price">
            {type === "givenOffers" && "Verilen Teklif:"}
            {type === "receivedOffers" && "Alınan Teklif:"}
            <b>{offeredPrice} TL</b>
          </span>
        </div>
        <div>{buttonRender()}</div>
      </div>
    </div>
  );
};

export default Offer;
