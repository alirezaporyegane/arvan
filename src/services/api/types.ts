import type { Method } from 'axios'
export type Filter = {
  [key: string]: string | { min: string; max: string }
}

export enum RequestMethod {
  POST = 'POST',
  DELETE = 'DELETE',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH'
}

export type ApiBody = {
  [key: string]: unknown
}

export type RequestOption = {
  url?: string
  method: Method
  action?: string | number
  params?: any
  body?: unknown
  accessToken?: string
}

export interface RequestError {
  data?: unknown[]
}

export enum EXCEPTION_CODE {
  BAD_REQUEST = 'BAD_REQUEST',
  SERVER_ERROR = 'SERVER_ERROR',
  CLIENT_ERROR = 'CLIENT_ERROR'
}

export class ErrorException {
  errorCode: number
  data: unknown
  code: keyof typeof EXCEPTION_CODE
  status: number

  constructor(data: unknown, status: number, code: keyof typeof EXCEPTION_CODE, errorCode: number) {
    this.data = data
    this.errorCode = errorCode
    this.code = code
    this.status = status
  }
}

export type ErrorExceptions = ErrorException[]
