import { useAuthStore } from '@/stores/Auth'

export default async function authMiddleware(
  to: { path: string },
  _: any,
  next: (path?: string) => void
) {
  const authStore = useAuthStore()

  if (to.path.includes('auth') && authStore.account) return next('/')
  else if (!authStore.account && !to.path.includes('auth')) return next('/auth/login')

  return next()
}
