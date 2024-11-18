import { errorMessage } from '@/utils/snackbar'
import { ErrorException, type ErrorExceptions } from './types'
import i18n from '@/services/translate'

export function isExceptionArray(error: Nullable<unknown>) {
  return error instanceof Array
}

export function isError(error: Nullable<unknown>) {
  return error instanceof Error
}

export function hasMobileConfirmException(err: unknown) {
  if (isExceptionArray(err))
    return (err as ErrorExceptions).find((exception) => exception.status === 412)

  return false
}

export function exceptionHandler(error: unknown) {
  if (isExceptionArray(error)) {
    const exceptions = error as ErrorException[]
    for (const exception of exceptions) {
      errorMessage(exceptionMessage(exception))
    }
  } else if (isError(error)) errorMessage((error as Error).message)
  else errorMessage(JSON.stringify(error))
}

export function exceptionMessage(exception: ErrorException) {
  if (i18n.global.te(`errorCodes.${exception.errorCode}`))
    return i18n.global.t(`errorCodes.${exception.errorCode}`)

  if (i18n.global.te(`errorCodes.${exception.code}`))
    return i18n.global.t(`errorCodes.${exception.code}`)

  if (i18n.global.te(`errorCodes.${exception.status}`))
    return i18n.global.t(`errorCodes.${exception.status}`)

  return i18n.global.t('errorCodes.unhandled')
}
