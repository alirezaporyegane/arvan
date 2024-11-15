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
    name: 'newArticle',
    url: '/new-article'
  }
]

export default items
