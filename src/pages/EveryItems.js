import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEveryItemAct } from "../redux/actions";
import { Header, ItemCard } from "../components";
import { banner1x, banner2x, loading } from "../assets";
import { categories } from "../helpers/categoryOptions";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const EveryItems = () => {
  const dispatch = useDispatch();
  const { type } = useParams();
  const products = useSelector((state) => state.products);
  const [datas, setDatas] = useState([]);
  const [activeIndex, setActiveIndex] = useState(type ? null : 0);

  useEffect(() => {
    dispatch(fetchEveryItemAct());
    return () => dispatch(fetchEveryItemAct("clear"));
  }, []);

  useEffect(() => {
    if (products.isError) toast.error(products.isError);
  }, [products.isError]);

  useEffect(() => {
    setDatas(products.data);
    if (type && products.data.length !== 0) {
      filterItems(type.toLowerCase());
      categories.map((category, index) => {
        if (category.toLowerCase() === type.toLowerCase())
          setActiveIndex(index);
        return null;
      });
    }
  }, [products.data]);

  const filterItems = (category) => {
    if (category === "hepsi") setDatas(products.data);
    else {
      const filteredData = products.data.filter(
        (item) => item.category.title.toLowerCase() === category
      );
      setDatas(filteredData);
    }
  };

  return (
    <>
      <Header />
      <section className="all-products-page">
        <div className="banner-wrapper">
          <img
            srcSet={`${banner1x}, ${banner2x} 2x`}
            src={banner1x}
            alt="ürünleri-keşfet"
          />
        </div>
        <div className="categories">
          {categories.map((category, index) => (
            <Link
              key={category}
              to={index === 0 ? `/` : `/${category.toLowerCase()}`}
              className={index === activeIndex ? "active" : null}
              onClick={() => {
                filterItems(category.toLowerCase());
                setActiveIndex(index);
              }}
            >
              {category}
            </Link>
          ))}
        </div>
        <div className="straight-line"></div>
        {datas.length === 0 && activeIndex !== null && activeIndex !== 0 && (
          <span className="no-item-found">
            Üzgünüz, bu kategoride ürün bulunmamaktadır.
          </span>
        )}
        <div className="products-container">
          {products.isFetching && (
            <img className="loadingGif" src={loading} alt="yükleniyor" />
          )}
          {datas.map((item) => {
            const { brand, color, id, imageUrl, price } = item;
            const brandName = brand.title,
              colorName = color.title;
            const properties = { brandName, colorName, imageUrl, price, id };
            return <ItemCard key={id} {...properties} />;
          })}
        </div>
      </section>
    </>
  );
};

export default EveryItems;
