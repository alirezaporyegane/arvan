export default function useAppConfig() {
  return {
    get apiUrl(): string {
      return import.meta.env.VITE_APP_API_URL || 'http://5.34.201.164:3000/api'
    },
    get baseUrl(): string {
      return import.meta.env.BASE_URL || '/articles'
    }
  }
}
