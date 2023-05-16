import Cookies from "js-cookie";

const TokenKey = 'quanyuan-live-Access-Token'
const refreshKey = 'quanyuan-live-Refresh-Token'

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
