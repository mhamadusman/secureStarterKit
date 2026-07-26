import axios from 'axios'
import { toast } from 'react-toastify'
import { env } from '../config/env'
import { ERROR_MESSAGES } from '../../src/constants/constants.ERROR_MESSAGES'

export const api = axios.create({
  baseURL: env.backendUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isValidationError = error.response?.status === 400 && error.response?.data?.errors
    if (isValidationError) {
      const message =
        error.response?.data?.message ?? 
        error.message ?? 
        ERROR_MESSAGES.UNEXPECTED_ERROR

      toast.error(message, {
        position: 'bottom-right',
        autoClose: 5000,
      })
    }

    return Promise.reject(error)
  },
)

export default api