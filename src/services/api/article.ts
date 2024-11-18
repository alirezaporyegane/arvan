import { sendRequest } from './core'
import type { Article, ArticleResponse } from '@/types/Article'

const BASE_URL = '/articles'

export const articleApi = {
  getAll() {
    return sendRequest<ArticleResponse>(BASE_URL, {
      method: 'GET'
    })
  },

  getBySlug(slug: string) {
    return sendRequest<{ article: Article }>(BASE_URL, {
      method: 'GET',
      action: slug
    })
  },

  create(body?: { article: Article }) {
    return sendRequest<Article>(BASE_URL, {
      method: 'POST',
      body
    })
  },

  update(slug: string, body?: { article: Article }) {
    return sendRequest<Article>(BASE_URL, {
      method: 'PUT',
      action: slug,
      body
    })
  },

  remove(slug?: string) {
    return sendRequest<string>(BASE_URL, {
      method: 'DELETE',
      action: slug
    })
  }
}
