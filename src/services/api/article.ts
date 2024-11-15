import { sendRequest } from './core'
import type { Article, ArticleResponse } from '@/types/Article'

const BASE_URL = '/articles'

export const articleApi = {
  getAll() {
    return sendRequest<ArticleResponse>(BASE_URL, {
      method: 'GET'
    })
  },

  getAllByPage(page: number) {
    return sendRequest<ArticleResponse>(BASE_URL, {
      method: 'GET',
      action: `page/${page}`
    })
  },

  update(body: Article, slug: string) {
    return sendRequest<Article>(BASE_URL, {
      method: 'PUT',
      action: slug,
      body
    })
  }
}
