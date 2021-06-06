import axios from "axios";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const isJwtTokenExist = () =>
  localStorage.getItem("jwtToken") ? true : false;

export const isJwtTokenExpire = () => {
  const curToken = localStorage.getItem("jwtToken");

  const decoded = jwtDecode(curToken);
  const curTime = Date.now() / 1000;

  return decoded.exp < curTime;
};
