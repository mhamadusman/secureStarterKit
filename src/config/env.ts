function requireEnv(key: keyof ImportMetaEnv): string {
  const value = import.meta.env[key]

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }

  return value
}

export const env = {
  backendUrl: requireEnv('VITE_BACKEND_URL'),
  mode: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const
