export type SidebarItem = {
  id: number
  name: string
  url: string
}

const items: SidebarItem[] = [
  {
    id: 1,
    name: 'allArticle',
    url: '/article'
  },
  {
    id: 2,
    name: 'createArticle',
    url: '/article/create'
  }
]

export default items
