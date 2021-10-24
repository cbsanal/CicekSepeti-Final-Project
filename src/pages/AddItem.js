import { Header, FormOptions, ImgUpload } from "../components";
import { useState, useEffect } from "react";
import { fetchItemOptionsAct, addItemAct } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loadingWhite } from "../assets";
import { Redirect } from "react-router";
import Cookies from "js-cookie";

const AddItem = () => {
  const dispatch = useDispatch();
  // Form elements
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState({ title: "Kategori seç", id: "" });
  const [brand, setBrand] = useState({ title: "Marka seç", id: "" });
  const [color, setColor] = useState({ title: "Renk seç", id: "" });
  const [status, setStatus] = useState({
    title: "Kullanım durumu seç",
    id: "",
  });
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState("");
  const [isOfferable, setIsOfferable] = useState(false);
  // Showing Options
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [showBrandOptions, setShowBrandOptions] = useState(false);
  const [showStatusOptions, setShowStatusOptions] = useState(false);
  const [priceValidationErr, setPriceValidationErr] = useState(false);
  const itemOptions = useSelector((state) => state.itemOptions);
  const newItem = useSelector((state) => state.newItem);

  useEffect(() => {
    dispatch(fetchItemOptionsAct("color"));
    dispatch(fetchItemOptionsAct("status"));
    dispatch(fetchItemOptionsAct("category"));
    dispatch(fetchItemOptionsAct("brand"));
    return () => dispatch(addItemAct([], "clear"));
  }, []);

  useEffect(() => {
    if (newItem.status) {
      toast.success("İşlem başarılı, bol şans", { hideProgressBar: true });
      setTimeout(() => {
        window.location.reload();
      }, 2250);
    }
    if (newItem.isError) toast.error(`${newItem.isError}`);
  }, [newItem]);

  const validationControl = (e) => {
    e.preventDefault();
    if (!category.id || !brand.id || !color.id || !status.id || !imgUrl)
      toast.error("Lütfen tüm formu eksiksiz doldurunuz");
    else {
      const part1 = { title: name, price: parseInt(price), imageUrl: imgUrl };
      const part2 = { description: desc, status, color, brand, isOfferable };
      const item = { ...part1, ...part2, category };
      dispatch(addItemAct(item));
    }
  };

  return (
    <>
      {!Cookies.get("jwt") && <Redirect to="/login" />}
      <Header />
      <div className="new-item-container">
        <div className="new-item-form">
          <h2>Ürün Detayları</h2>
          <form onSubmit={validationControl}>
            <label htmlFor="item-name">Ürün Adı</label>
            <input
              placeholder="Örnek: Iphone 12 Pro Max"
              type="text"
              id="item-name"
              autoFocus
              required
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="item-name"
            />
            <label htmlFor="item-desc">Açıklama</label>
            <textarea
              placeholder="Ürün açıklaması girin"
              type="text"
              id="item-desc"
              required
              maxLength={500}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="item-desc"
            />
            <div className="item-options">
              <FormOptions
                type="Kategori"
                options={itemOptions.categoryOptions}
                setOptionValue={setCategory}
                setShowOptions={setShowCategoryOptions}
                showOptions={showCategoryOptions}
                value={{ ...category }}
              />
              <FormOptions
                type="Marka"
                options={itemOptions.brandOptions}
                setOptionValue={setBrand}
                setShowOptions={setShowBrandOptions}
                showOptions={showBrandOptions}
                value={{ ...brand }}
              />
            </div>
            <div className="item-options">
              <FormOptions
                type="Renk"
                options={itemOptions.colorOptions}
                setOptionValue={setColor}
                setShowOptions={setShowColorOptions}
                showOptions={showColorOptions}
                value={{ ...color }}
              />
              <FormOptions
                type="Kullanım Durumu"
                options={itemOptions.statusOptions}
                setOptionValue={setStatus}
                setShowOptions={setShowStatusOptions}
                showOptions={showStatusOptions}
                value={{ ...status }}
              />
            </div>
            <div className="price-container">
              <label htmlFor="price">Fiyat</label>
              <div className={priceValidationErr ? "validation-error" : null}>
                <input
                  required
                  type="text"
                  placeholder="Bir fiyat girin"
                  value={price}
                  onChange={(e) => {
                    const re = /^[0-9\b]+$/;
                    if (re.test(e.target.value) || e.target.value === "") {
                      setPriceValidationErr(false);
                      setPrice(e.target.value);
                    } else setPriceValidationErr(true);
                  }}
                />
                <span>TL</span>
              </div>
              {priceValidationErr && (
                <span className="price-validation">
                  0-9 Arasında Bir Rakam Girin
                </span>
              )}
            </div>
            <div className="is-offerable">
              <span>Teklif opsiyonu</span>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  className="checkbox"
                  id="switch"
                  onChange={() => setIsOfferable(!isOfferable)}
                />
                <label className="label" htmlFor="switch">
                  <span className="inner" />
                  <span className="switch" />
                </label>
              </div>
            </div>
            <button className="submit-item-btn">
              {newItem.isLoading && (
                <img src={loadingWhite} alt="loading-gif" />
              )}
              Kaydet
            </button>
          </form>
        </div>
        <div className="vertical-line"></div>
        <div className="item-img-upload">
          <h2>Ürün Görseli</h2>
          <ImgUpload imgUrl={imgUrl} setImgUrl={setImgUrl} />
        </div>
      </div>
    </>
  );
};

export default AddItem;
