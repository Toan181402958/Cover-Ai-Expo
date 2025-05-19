import axios from "axios"
import { BASE_URL } from "constants/constants"

export type ResponseType<T> =  {
    result_code: number
    result_error: any
    status: number
    code: number
    message: string
    data: any
  }
  

// import NavigationUtil from '@app/navigation/NavigationUtil';
const STOP_PING = 11
const START_LIVE = 19

const createAPI = () => {
  const APIInstant = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    headers: {
        "Content-Type": "application/json"
    }
  })
//   APIInstant.defaults.baseURL = BASE_URL
//   APIInstant.defaults.timeout = 60000
//   APIInstant.defaults.headers = { 'Content-Type': 'application/json' }

  APIInstant.interceptors.response.use(
    (response: any) => {
      const data = response.data
      if(response && data){
        return data
      }
    //   if (data && data.code === 401) {
    //     showMessages(R.strings().notification, R.strings().re_login, () => {
    //       AsyncStorageService.putClient('')
    //       AsyncStorage.setItem('token', '').then(() => {
    //         NavigationUtil.navigate(SCREEN_ROUTER_AUTH.SPLASH)
    //       })
    //     })
    //   } else if (data && data.status !== 1) {
    //     if (data.code === START_LIVE) {
    //       return
    //     }
    //     if (data && data.status) {
    //       return
    //     }
    //     if (data.code == 9 && data.status == 0) {
    //       showMessages(R.strings().notification, data.message)
    //       return
    //     }
    //     showMessages(R.strings().notification, data.message)
    //   }
      return response
    },
    (err: Error) => {
      console.log(err)
    }
  )
  return APIInstant
}

const axiosClient = createAPI()

function handleResult<T>(api: any) {
  return api.then((res: any) => {
    return handleResponse<T>(res)
  })
}

function handleResponse<T>(data: ResponseType<T>) {
//   if (data.status !== 1)
//     return Promise.reject(new Error(data?.message || 'Co loi xay ra'))
  return Promise.resolve(data)
}

export const ApiClient = {
  get: (url: string, payload?: any) =>
    handleResult(axiosClient.get(url, payload)),
  post: (url: string, payload?: any, options?: any) =>
    handleResult(axiosClient.post(url, payload, options)),
  put: (url: string, payload?: any) =>
    handleResult(axiosClient.put(url, payload)),
  path: (url: string, payload?: any) =>
    handleResult(axiosClient.patch(url, payload)),
  delete: (url: string, payload?: any) =>
    handleResult(axiosClient.delete(url, payload)),
}
