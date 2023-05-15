import { axios } from '../utils/request'

/**
 * 获取数据字典
 */
export function getCourseWithViewCount(id) {
  return axios({
    url: `/viewCount/course/${id}`,
    method: 'get',
    // params: { catalogCode: code }
  })
}

export function login(data) {
  return axios({
    url: `/auth/login`,
    method: 'post',
    // params: { catalogCode: code }
    data
  })
}


export function logout(refreshToken) {
  return axios({
    url: `/auth/logout`,
    method: 'post',
    // params: { catalogCode: code }
    data: {
      "refresh_token": refreshToken
    }
  })
}

export function itemsPost(table, data) {
  return axios({
    url: `/items/${table}`,
    method: 'post',
    data
  })
}

