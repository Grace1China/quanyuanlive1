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