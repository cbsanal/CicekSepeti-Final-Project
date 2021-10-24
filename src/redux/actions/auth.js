import { AUTH_STATUS } from "../constants";
import Cookies from "js-cookie";

const tokenFound = (data) => ({
  type: AUTH_STATUS.AUTH_STATUS_TOKEN_FOUND,
  payload: data,
});

const tokenError = (error) => ({
  type: AUTH_STATUS.AUTH_STATUS_TOKEN_ERROR,
  payload: error,
});

const tokenFetching = () => ({
  type: AUTH_STATUS.AUTH_STATUS_TOKEN_FETCHING,
});

const sendRequest = async (requestType, email, password, dispatch) => {
  fetch(
    `https://bootcampapi.techcs.io/api/fe/v1/authorization/${requestType}`,
    {
      method: "POST",
      withCredentials: true,
      headers: {
        Accept: "*/*",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  )
    .then((response) => {
      if (response.status === 409 && requestType === "signup")
        throw new Error("Bu email ile daha önce kayıt olunmuş.");
      if (response.status === 400 && requestType === "signup")
        throw new Error("Geçerli olmayan email ve/veya şifre girdiniz.");
      if (response.status === 401 && requestType === "signin")
        throw new Error("Yanlış email veya şifre girdiniz.");
      if (response.status === 201) return response.json();
      else throw new Error("Bilinmeyen bir hata oluştu.");
    })
    .then((data) => {
      dispatch(tokenFound(data.access_token));
      // I need to access to email in My Account page
      // If I keep the email in state it will be gone when the user refresh the page
      // This is why I set email as a cookie
      Cookies.set("email", email);
    })
    .catch((err) => {
      dispatch(tokenError(`${err}`));
    });
};

const authControl = (email, password, authType) => async (dispatch) => {
  dispatch(tokenFetching());
  if (authType === "login")
    return await sendRequest("signin", email, password, dispatch);
  else return await sendRequest("signup", email, password, dispatch);
};

export default authControl;
