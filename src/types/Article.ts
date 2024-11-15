export type Article = {
  slug: string
  title: string
  description: string
  body: string
  tagList?: string[] | null
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: Author
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
