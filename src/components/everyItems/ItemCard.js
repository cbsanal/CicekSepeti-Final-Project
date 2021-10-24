import { Link } from "react-router-dom";

const ItemCard = ({ brandName, colorName, imageUrl, price, id }) => {
  return (
    <Link to={`/item/${id}`}>
      <div className="item">
        <div className="item-img-wrapper">
          <img src={imageUrl} alt="urun-img" />
        </div>
        <div className="brand-color-wrapper">
          <span>{brandName}</span>
          <span>
            <b>Renk: </b>
            <span>{colorName}</span>
          </span>
        </div>
        <span className="price">{price} TL</span>
      </div>
    </Link>
  );
};

export default ItemCard;
