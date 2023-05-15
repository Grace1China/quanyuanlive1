import Cookies from "js-cookie";

const TokenKey = 'quanyuan-' + process.env.REACT_APP_DIRECTUS_URL + '-Access-Token'
const refreshKey = 'quanyuan-' + process.env.REACT_APP_DIRECTUS_URL + '-Refresh-Token'

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getRefreshToken() {
  return Cookies.get(refreshKey);
}

export function setRefreshToken(refreshToken) {
  return Cookies.set(refreshKey, refreshToken);
}

export function removeRefreshToken() {
  return Cookies.remove(refreshKey);
}
