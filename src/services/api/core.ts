import { useAuthStore } from '@/stores/Auth'
import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { stringify } from 'qs'
import { useRoute, useRouter } from 'vue-router'
import { ErrorException } from './types'
import type { ErrorExceptions, RequestOption } from './types'

const statusConfig = {
  loginRedirect: [406, 407, 401, 403],
  logout: [406, 407, 401, 403, 425, 502],
  failed: [500, 501, 502, 503, 504]
}

export async function sendRequest<T>(url: string, options: RequestOption): Promise<T> {
  const req = requestConfig(url, options)
  try {
    const res = await axios(req)

    return res.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) throw await errorHandler(err as AxiosError<ErrorExceptions, any>)
    else {
      const error = err as Error

      // useSnackbar().show(error.message)
      throw [] as ErrorExceptions
    }
  }
}

function requestConfig(endpointBaseUrl: string, options: RequestOption): AxiosRequestConfig {
  const restUrl = [endpointBaseUrl, options.action].filter((item) => !!item).join('/')
  const baseURL = 'http://5.34.201.164:3000/api'
  const axiosRequestConfig: AxiosRequestConfig = {
    baseURL,
    url: restUrl,
    method: options.method,
    params: options.params,
    headers: {},
    data: options.body,
    paramsSerializer(params) {
      return stringify(params, { arrayFormat: 'repeat' })
    }
  }

  const authStore = useAuthStore()

  if (authStore.accessToken || options.accessToken) {
    if (axiosRequestConfig.headers)
      axiosRequestConfig.headers.Authorization = `Bearer ${
        authStore.accessToken || options.accessToken
      }`
  }

  return axiosRequestConfig
}

async function errorHandler(err: AxiosError<ErrorExceptions>): Promise<any> {
  // Customize Log For Any Error
  if (err.message.includes('ENETUNREACH') || err.message.includes('Network Error')) {
    return Promise.resolve([])
  }

  const error = err.response
  if (!error) {
    const clientError = new ErrorException({ message: 'client error' }, -1, 'CLIENT_ERROR', -1)
    throw [clientError]
  }

  if (statusConfig.logout.includes(error.status)) {
    const authStore = useAuthStore()

    authStore.logout()
  }

  if (statusConfig.loginRedirect.includes(error.status)) {
    const route = useRoute()
    const router = useRouter()

    await router?.push(`/auth/login?returnUrl=${route.fullPath}`)
  } else if (statusConfig.failed.includes(error.status) && error.data[0]?.errorCode !== 4021)
    if (!Array.isArray(error.data)) throw [error.data]
    else throw error.data
}
