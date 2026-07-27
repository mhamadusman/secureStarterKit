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
  async (error) => {
    const originalRequest = error.config
    const status = error.response?.status

    // 1. Handle Validation Errors (400)
    const isValidationError = status === 400 && error.response?.data?.errors
    if (isValidationError) {
      const message =
        error.response?.data?.message ??
        error.message ??
        ERROR_MESSAGES.UNEXPECTED_ERROR

      toast.error(message, {
        position: 'bottom-right',
        autoClose: 5000,
      })
      return Promise.reject(error)
    }

    // 2. Handle 401 Unauthorized (Automatic Refresh Token Logic)
    const isUnauthorized = status === 401
    const isAuthEndpoint =
      originalRequest.url?.includes('/auth/refresh-token') ||
      originalRequest.url?.includes('/auth/login')

    if (isUnauthorized && !originalRequest._retry && !isAuthEndpoint) {
      // Set retry flag so this original request only retries ONCE
      originalRequest._retry = true

      try {
        // Attempt to request a new access token
        await api.post('/auth/refresh-token')

        // Retry the original failed request with updated cookies/tokens
        return api(originalRequest)
      } catch (refreshError: any) {
        // Refresh token failed/expired — trigger backend error toast if present
        const backendMessage =
          refreshError.response?.data?.message || 'Session expired. Please log in again.'

        toast.error(backendMessage, {
          position: 'bottom-right',
          autoClose: 5000,
        })

        // Redirect to login page
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api