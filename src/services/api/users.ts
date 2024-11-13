import type { Auth, LoginBody, RegisterBody } from '@/types/Users'
import { sendRequest } from './core'

const BASE_URL = '/users'

export const usersApi = {
  login(body: LoginBody) {
    return sendRequest<Auth>(BASE_URL, {
      method: 'POST',
      action: 'login',
      body
    })
  },

  register(body: RegisterBody) {
    return sendRequest<Auth>(BASE_URL, {
      method: 'POST',
      body
    })
  }
}
