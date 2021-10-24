import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyItemAct, itemDetailsAct } from "../../redux/actions";
import { toast } from "react-toastify";

const BuyModal = ({ setShowBuyModal, id, token }) => {
  const dispatch = useDispatch();
  const buyItem = useSelector((state) => state.buyItem);

  useEffect(() => {
    if (buyItem.status) {
      toast.success("Satın alındı.");
      setShowBuyModal(false);
      //In some items when you bought them, their isSold property does not change
      //but isSold properties in offers become "sold" and this causes a problem sometimes
      dispatch(itemDetailsAct(id, "clear"));
      dispatch(itemDetailsAct(id));
    }
  }, [buyItem.status]);

  useEffect(() => {
    if (buyItem.isError) toast.error(buyItem.isError);
  }, [buyItem.isError]);

  return (
    <section className="buy-modal">
      <div className="buy-container br8">
        <p>Satın Al</p>
        <p>Satın Almak istiyor musunuz?</p>
        <div className="buy-btn-wrapper">
          <button onClick={() => setShowBuyModal(false)}>Vazgeç</button>
          <button onClick={() => dispatch(buyItemAct(id, token))}>
            Satın Al
          </button>
        </div>
      </div>
    </section>
  );
};

export default BuyModal;
