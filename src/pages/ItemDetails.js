import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Header, OfferModal, BuyModal } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { loading } from "../assets";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {
  itemDetailsAct,
  givenOffersAct,
  cancelOfferAct,
} from "../redux/actions";

const ItemDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detailsObject = useSelector((state) => state.oneProduct);
  const details = detailsObject.data;
  const givenOffers = useSelector((state) => state.givenOffers.data);
  const cancelOffer = useSelector((state) => state.cancelOffer);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const token = Cookies.get("jwt");
  let offeredPrice = null;
  let offerId = null;

  if (givenOffers) {
    givenOffers.map((offeredItem) => {
      if (offeredItem.productId === id) {
        offeredPrice = offeredItem.offeredPrice;
        offerId = offeredItem.id;
      }
      return null;
    });
  }

  useEffect(() => {
    if (cancelOffer.status) {
      dispatch(givenOffersAct(token));
      toast.success("Teklif iptal edildi.");
    }
    if (detailsObject.isError) toast.error(`${detailsObject.isError}`);
  }, [cancelOffer.status, detailsObject.isError]);

  useEffect(() => {
    if (token) dispatch(givenOffersAct(token));
    dispatch(itemDetailsAct(id));
    return () => dispatch(itemDetailsAct(id, "clear"));
  }, []);

  if (detailsObject.isFetching) {
    return (
      <>
        <Header />
        <img className="item-loading " src={loading} alt="ürün yükleniyor" />
      </>
    );
  }

  return (
    <>
      {showOfferModal && (
        <OfferModal
          img={details.imageUrl}
          title={details.title}
          price={details.price}
          setShowOfferModal={setShowOfferModal}
          id={id}
          token={token}
        />
      )}
      {showBuyModal && (
        <BuyModal setShowBuyModal={setShowBuyModal} token={token} id={id} />
      )}
      <Header />
      <div className="details">
        <div className="img-wrapper">
          <img src={details.imageUrl} alt="ürün-resmi" />
        </div>
        <div className="details-info">
          <span className="title">{details.title}</span>
          <div className="details-container">
            <div className="details-options">
              <div>
                <b>Marka: </b>
                <b>Renk: </b>
                <b>Kullanım Durumu: </b>
              </div>
              <div>
                <span>{details.brand?.title}</span>
                <span>{details.color?.title}</span>
                <span>{details.status?.title}</span>
              </div>
            </div>
            <div className="prices-container">
              <span className="price">{details.price} TL</span>
              {offeredPrice && !details.isSold && (
                <span className="offered-price">
                  Verilen Teklif:<b>{offeredPrice} TL</b>
                </span>
              )}
            </div>
          </div>
          <div className="details-btn-wrapper">
            {!details.isSold && (
              <button
                onClick={() => {
                  if (token) setShowBuyModal(true);
                  else toast.error("Lütfen önce giriş yapınız.");
                }}
                className="buy-item"
              >
                Satın Al
              </button>
            )}
            {details.isSold && (
              <b className="already-sold">Bu Ürün Satışta Değil</b>
            )}
            {offeredPrice && !details.isSold && (
              <button
                onClick={() => dispatch(cancelOfferAct(offerId, token))}
                className="cancel-offer"
              >
                Teklifi Geri Çek
              </button>
            )}
            {!details.isSold && details.isOfferable && !offeredPrice && (
              <button
                className="make-offer"
                onClick={() => {
                  if (token) setShowOfferModal(true);
                  else toast.error("Lütfen önce giriş yapınız.");
                }}
              >
                Teklif Ver
              </button>
            )}
          </div>
          <span className="desc-title">Açıklama</span>
          <span className="description">{details.description}</span>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
