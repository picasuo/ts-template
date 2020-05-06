import axios, { AxiosRequestConfig } from 'axios'
import { HTTP_URL, IMAGE_URL } from 'config/config'
import { session } from 'store/index'

const axiosInstance = axios.create({
  baseURL: HTTP_URL,
})

axiosInstance.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json; charset=UTF-8'
    config.headers['Authorization'] = 'Bearer' + session.token
    // 删除headers中key值为空(falsy)的header
    for (const prop in config.headers) {
      if (!config.headers[prop]) {
        delete config.headers[prop]
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  response => response.data,
  error => checkStatus(error),
)

function checkStatus({ response }) {
  let error_msg = '网络异常'
  if (response) {
    const { status, data } = response
    switch (status) {
      case 304:
        // 304 不会返回数据 这里 data 为空(要设计 304 缓存数据)
        return data
      case 402:
        // 权限错误 重新登陆
        error_msg = '登陆已失效,请重新登陆'
        break
      default:
        error_msg = data.error_msg || '网络异常'
        break
    }
  }
  return Promise.reject({ status: response.status || 404, error_msg })
}

// 请求基础配置
const baseConfig: AxiosRequestConfig = {
  timeout: 10000,
}

export default {
  get<T>(url, params?, config?: AxiosRequestConfig) {
    return axiosInstance.get<T>(url, { params, ...baseConfig, ...config })
  },
  post<T>(url, data?, config?: AxiosRequestConfig) {
    return axiosInstance.post<T>(url, data, { ...baseConfig, ...config })
  },
  put<T>(url, data?, config?: AxiosRequestConfig) {
    return axiosInstance.put<T>(url, data, { ...baseConfig, ...config })
  },
  delete<T>(url, data?, config?: AxiosRequestConfig) {
    return axiosInstance.delete<T>(url, { data, ...baseConfig, ...config })
  },
}

/**
 * 获取图片地址 (图片空间)
 * @param val 图片名称
 * @param size 图片大小
 * @param noCache 是否取消缓存
 */
export const getImgSrc = (val: string, size: string, noCache = false): string =>
  `${IMAGE_URL}/image/${val}?size=${size}` + noCache
    ? `&timeStamp=${Date.now()}`
    : ''
