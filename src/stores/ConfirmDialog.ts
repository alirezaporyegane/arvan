import { defineStore } from 'pinia'
import i18n from '@/services/translate'

type Config = {
  title?: string
  description?: string
  confirmBtnText?: string
  cancelBtnText?: string
  resolvePromise?: any
  rejectPromise?: any
  showHideBtn?: boolean
}

export const useConfirmDialogStore = defineStore('confirmDialog', {
  state() {
    return {
      isVisible: false as boolean,
      config: {
        title: i18n.global.t('shared.areYouSureToDeleteThisItem'),
        confirmBtnText: i18n.global.t('shared.yes'),
        cancelBtnText: i18n.global.t('shared.no'),
        showHideBtn: true
      } as Config
    }
  },
  actions: {
    async showConfirmDialog(config?: Config): Promise<boolean> {
      this.config = {
        title: config?.title || i18n.global.t('shared.deleteArticle'),
        description: config?.description || i18n.global.t('shared.areYouSureToDeleteThisItem'),
        confirmBtnText: config?.confirmBtnText || i18n.global.t('shared.yes'),
        cancelBtnText: config?.cancelBtnText || i18n.global.t('shared.no'),
        showHideBtn: config?.showHideBtn
      }

      this.isVisible = true

      return new Promise((resolve, reject) => {
        this.config.resolvePromise = resolve
        this.config.rejectPromise = reject
      })
    },
    hideConfirmDialog() {
      this.isVisible = false
    }
  }
})
