import { VNode } from 'vue'
import { toast, type Options } from 'vue3-toastify'

const config: Options = {
  position: toast.POSITION.TOP_RIGHT,
  transition: toast.TRANSITIONS.ZOOM,
  theme: toast.THEME.COLORED,
  hideProgressBar: true
}

export function successMessage(title: string | VNode) {
  toast.success(title, config)
}

export function errorMessage(title: string | VNode) {
  toast.error(title, config)
}
