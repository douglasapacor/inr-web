import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { defaultResponse } from "./fetchApiProperties"
import appConfig from "@/config/appConfig"

const instance = axios.create({
  baseURL: appConfig.base
})

const get = async <T = any>(
  url: string,
  config?: AxiosRequestConfig<any>
): Promise<defaultResponse<T>> => {
  try {
    const responseHttpRequest: AxiosResponse<defaultResponse> =
      await instance.get(url, config)

    if (responseHttpRequest.status === 200) {
      if (responseHttpRequest.data.data) {
        return {
          success: responseHttpRequest.data.success,
          data: responseHttpRequest.data.data,
          message: responseHttpRequest.data.message
        }
      } else {
        return {
          success: responseHttpRequest.data.success,
          message: responseHttpRequest.data.message
        }
      }
    } else {
      return {
        success: false,
        message: responseHttpRequest.data.message
      }
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message
    }
  }
}

const post = async <T = any>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig<any>
): Promise<defaultResponse<T>> => {
  try {
    const responseHttpRequest: AxiosResponse<defaultResponse> =
      await instance.post(url, body, config)

    if (responseHttpRequest.status === 200) {
      if (responseHttpRequest.data.data) {
        return {
          success: responseHttpRequest.data.success,
          data: responseHttpRequest.data.data,
          message: responseHttpRequest.data.message
        }
      } else {
        return {
          success: responseHttpRequest.data.success,
          message: responseHttpRequest.data.message
        }
      }
    } else {
      return {
        success: false,
        message: responseHttpRequest.data.message
      }
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message
    }
  }
}

const put = async <T = any>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig<any>
): Promise<defaultResponse<T>> => {
  try {
    const responseHttpRequest: AxiosResponse<defaultResponse> =
      await instance.put(url, body, config)

    if (responseHttpRequest.status === 200) {
      if (responseHttpRequest.data.data) {
        return {
          success: responseHttpRequest.data.success,
          data: responseHttpRequest.data.data,
          message: responseHttpRequest.data.message
        }
      } else {
        return {
          success: responseHttpRequest.data.success,
          message: responseHttpRequest.data.message
        }
      }
    } else {
      return {
        success: false,
        data: responseHttpRequest.data.data
      }
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message
    }
  }
}

const del = async <T = any>(
  url: string,
  config?: AxiosRequestConfig<any>
): Promise<defaultResponse<T>> => {
  try {
    const responseHttpRequest: AxiosResponse<defaultResponse> =
      await instance.delete(url, config)

    if (responseHttpRequest.status === 200) {
      if (responseHttpRequest.data.data) {
        return {
          success: responseHttpRequest.data.success,
          data: responseHttpRequest.data.data,
          message: responseHttpRequest.data.message
        }
      } else {
        return {
          success: responseHttpRequest.data.success,
          message: responseHttpRequest.data.message
        }
      }
    } else {
      return {
        success: false,
        message: responseHttpRequest.data.message
      }
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message
    }
  }
}

const fetchApi = {
  get,
  post,
  put,
  del
}

export default fetchApi
