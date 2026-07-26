import api from "../utils/api"

export class AuthService {
  static async signUp(data: Record<string, any>) {
    const response = await api.post('/auth/sign-up', data)
    return response.data
  }

  static async login(data: Record<string, any>) {
    const response = await api.post('/auth/login', data)
    return response.data
  }

  static async logout() {
    const response = await api.post('/auth/log-out')
    return response.data
  }

  static async refreshToken() {
    const response = await api.post('/auth/refresh-token')
    return response.data
  }

  static async getCurrentUser() {
    const response = await api.get('/auth/me')
    return response.data
  }

  static async verifyEmailToken(params: Record<string, any>) {
    const response = await api.post('/auth/verify-email', params)
    return response.data
  }

  static async forgetPassword(data: { email: string }) {
    const response = await api.post('/auth/forget-password', data)
    return response.data
  }

  static async verifyPasswordResetUrl(params: Record<string, any>) {
    const response = await api.post('/auth/verify-password-reset-url', params)
    return response.data
  }

  static async resetPassword(data: Record<string, any>) {
    const response = await api.post('/auth/reset-password', data)
    return response.data
  }

  static loginWithGoogle() {
    window.location.href = 'http://localhost:5000/api/v1/auth/google'
  }

  static loginWithGithub() {
    window.location.href = 'http://localhost:5000/api/v1/auth/github'
  }
}

export const authService = AuthService