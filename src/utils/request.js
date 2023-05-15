import axios from 'axios'
// import store from '@/store'
// import notification from 'ant-design-vue/es/notification'
// import { VueAxios } from './axios'
// import { getToken } from '@/utils/auth'
// import { getRefrshToken } from '@/api/auth'

// import { useAppContext } from "../layouts/Default"


import { directus } from "../services/directus";
import { setToken, getToken } from './auth';

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.REACT_APP_DIRECTUS_URL,
  timeout: 60000 // 请求超时时间
})

/*
* 统一的错误处理，提供了默认的错误处理以及提示
* */
// 是否正在刷新的标记
let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requests = []
const newToken = ''
const Err = (error) => {
  // const { app, dispatch } = useAppContext();
  let code = 0
  try {
    code = error.response.status
  } catch (e) {
    if (error.toString().indexOf('Error: timeout') !== -1) {
      // notification.error({
      //   message: '网络请求超时',
      //   duration: 5000
      // })
      console.log('网络请求超时')
      // store.dispatch('Logout').then(() => {
      //   setTimeout(() => {
      //     window.location.reload()
      //   }, 16)
      // })

      directus.auth.logout().then((res) => {
        window.history.pushState({}, '', '/')
        window.location.reload()
        // dispatch({ type: "LOGOUT", playload: '' })
        setToken('')
      }).catch(err => {
        console.log(err)
        throw err
      })

      return Promise.reject(error)
    }
  }
  if (code) {
    // switch (code) {
    //   case 401:
    //     if (error.response.data.code === 'A0230') {
    //       var config = error.response.config
    //       //通过刷新token获取请求token
    //       if (!isRefreshing) {
    //         isRefreshing = true
    //         var params = {
    //           refreshToken: store.getters.refreshToken
    //         }
    //         return getRefrshToken(params).then(response => {
    //           if (response.success) {
    //             const data = response.data
    //             store.dispatch('resetToken', { access_token: data.access_token, refresh_token: data.refresh_token })
    //             config.baseURL = ''
    //             config.headers['Authorization'] = `Bearer ${data.access_token}`
    //             requests.forEach(cb => cb(data.access_token))
    //             // 重试完了别忘了清空这个队列
    //             requests = []
    //             // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
    //             return service(config)
    //           }
    //         })
    //           .catch(error => {
    //             notification.error({
    //               message: '错误消息',
    //               description: '刷新token请求失败'
    //             })
    //           }).finally(() => {
    //             isRefreshing = false
    //           })
    //       } else {
    //         // 正在刷新token，返回一个未执行resolve的promise
    //         return new Promise((resolve) => {
    //           // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
    //           requests.push((token) => {
    //             config.headers['Authorization'] = `Bearer ${token}`
    //             config.baseURL = ''
    //             resolve(service(config))
    //           })
    //         })
    //       }
    //     } else if (error.response.data.code == 'A0311' || error.response.data.code == 'A0220' || error.response.data.code == 'A0231') {
    //       notification.error({
    //         message: '错误消息',
    //         description: error.response.data.message || '系统错误，请联系管理员'
    //       })
    //       store.dispatch('Logout').then(() => {
    //         setTimeout(() => {
    //           window.location.reload()
    //         }, 16)
    //       })
    //     } else if (error.response.data.code == 'A0232') {
    //       setTimeout(() => {
    //         window.location.href = '/#/user/noMultipleLogin'
    //       }, 16)
    //     }
    //     else {
    //       notification.error({
    //         message: '错误消息',
    //         description: error.response.data.message || '系统错误，请联系管理员'
    //       })
    //     }
    //     break
    //   default:
    //     notification.error({
    //       message: '错误消息',
    //       description: error.response.data.message || '系统错误，请联系管理员'
    //     })
    // }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = getToken()
  console.log('token', token)
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, Err)

// response interceptor
service.interceptors.response.use((response) => {
  //如果是文件做不同的响应
  if (response.config.responseType == 'blob' || response.headers['content-disposition'] || response.headers['Content-disposition']) {
    return response
  }
  return response.data
}, Err)

// const installer = {
//   vm: {},
//   install(Vue) {
//     Vue.use(VueAxios, service)
//   }
// }

export {
  // installer as VueAxios,
  service as axios
}
