import { woman1x, woman2x, logo, loadingWhite } from "../assets";
import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { authAct } from "../redux/actions";
import Cookies from "js-cookie";

const Auth = ({ formType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  useEffect(() => {
    if (auth.isError) {
      toast.error(auth.isError);
      if (auth.isError === "Error: Bu email ile daha önce kayıt olunmuş.")
        setIsEmailValid(false);
      else {
        setIsEmailValid(false);
        setIsPasswordValid(false);
      }
    }
  }, [auth.isError]);

  const validationCheck = (e) => {
    e.preventDefault();
    const validRegexForEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(validRegexForEmail))
      dispatch(authAct(email, password, "register"));
    else {
      toast.error("Lütfen geçerli bir email adresi yazın.");
      setIsEmailValid(false);
    }
  };

  const loginAction = (e) => {
    e.preventDefault();
    dispatch(authAct(email, password, "login"));
  };

  const resetValues = () => {
    setEmail("");
    setPassword("");
    setIsEmailValid(true);
    setIsPasswordValid(true);
  };

  return (
    <section className="auth-container">
      {Cookies.get("jwt") && <Redirect to="/" />}
      <div className="img-container">
        <img
          srcSet={`${woman1x}, ${woman2x} 2x`}
          src={woman1x}
          alt="kadın-resmi"
        />
      </div>
      <div className="logo-form-container">
        <div className="logo-container">
          <img src={logo} alt="ikinci-el-logo" />
        </div>
        <div className="auth-form-container br8">
          <span>{formType === "register" ? "Üye Ol" : "Giriş Yap"}</span>
          <span>
            Fırsatlardan yararlanmak için
            {formType === "register" ? " üye ol" : " giriş yap"}!
          </span>
          <form
            className="auth-form"
            onSubmit={formType === "register" ? validationCheck : loginAction}
          >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email@example.com"
              required
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsEmailValid(true);
              }}
              className={!isEmailValid ? "not-valid" : null}
            />
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              required
              minLength="8"
              maxLength="20"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsPasswordValid(true);
              }}
              className={!isPasswordValid ? "not-valid" : null}
            />
            {formType === "login" && (
              <div className="forget-password">
                <Link to="/">Şifremi Unuttum</Link>
              </div>
            )}
            <button type="submit">
              {formType === "register" ? "Üye Ol" : "Giriş"}
              {auth.isFetching && (
                <img
                  className="auth-loading-gif"
                  src={loadingWhite}
                  alt="yükleniyor-gif"
                />
              )}
            </button>
          </form>
          {formType === "register" ? (
            <span className="direct-to-register">
              Hesabın var mı?{" "}
              <Link onClick={resetValues} to="/login">
                Giriş Yap
              </Link>
            </span>
          ) : (
            <span className="direct-to-login">
              Hesabın yok mu?{" "}
              <Link onClick={resetValues} to="/register">
                Üye Ol
              </Link>
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default Auth;
