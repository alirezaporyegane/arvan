import { sendRequest } from './core'

const BASE_URL = '/tags'

export const tagsApi = {
  getAll() {
    return sendRequest<{ tags: string[] }>(BASE_URL, {
      method: 'GET'
    })
  }
}
