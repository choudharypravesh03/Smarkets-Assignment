import { AppError } from './AppError'

export const getAppError = (error) => {
  const url = `${error?.config?.baseURL}${error?.config?.url}`
  if (error.response) {
    const description = `Request to ${url} failed with status code: ${error.response.status}`
    return new AppError('AxiosError', description, error.response.status, error.response.data)
  }
  const description = `Request to ${url} failed with message: ${error.message}`
  return new AppError('AxiosError', description)
}