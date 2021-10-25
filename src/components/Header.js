import { Link } from "react-router-dom";
import { plus, user, miniLogo } from "../assets";
import Cookies from "js-cookie";

const Header = () => {
  const token = Cookies.get("jwt");

  return (
    <header className="page-header">
      <Link to="/">
        <img className="mini-logo" src={miniLogo} alt="mini-logo" />
      </Link>
      <div className="header-btn-wrapper">
        {
          <Link to={token ? "/newItem" : "/login"}>
            <div>
              <img src={plus} alt="artı-ikonu" />
              <span>Ürün Ekle</span>
            </div>
          </Link>
        }
        {token ? (
          <Link to="/account">
            <div>
              <img src={user} alt="kullanıcı-ikonu" />
              <span>Hesabım</span>
            </div>
          </Link>
        ) : (
          <Link to="/login">
            <div>
              <img src={user} alt="kullanıcı-ikonu" />
              <span>Giriş Yap</span>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
