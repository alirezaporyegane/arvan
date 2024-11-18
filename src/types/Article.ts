export type Article = {
  slug?: string
  title: string | null
  description: string | null
  body: string | null
  tagList?: string[] | null
  createdAt?: string
  updatedAt?: string
  favorited?: boolean
  favoritesCount?: number
  author?: Author
}

export type Author = {
  username: string
  bio?: null
  image: string
  following: boolean
}

export type ArticleResponse = {
  articles: Article[]
  articlesCount: number
}
