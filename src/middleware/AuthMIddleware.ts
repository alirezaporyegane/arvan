import { Cookies } from '@/types/Cookies'
import { useCookies } from '@vueuse/integrations/useCookies'

export default function authMiddleware(
  to: { path: string },
  from: any,
  next: (path?: string) => void
) {
  const cookie = useCookies()
  const authCookie = cookie.get(Cookies.AUTH)

  if (to.path.includes('auth') && authCookie) return next('/')
  else if (!authCookie && !to.path.includes('auth')) return next('/auth/login')

  return next()
}
