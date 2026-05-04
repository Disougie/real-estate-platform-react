import axios from 'axios'

const API_BASE_URL =
  import.meta?.env?.VITE_API_BASE_URL || 'http://localhost:8080'
// 'https://real-estate-platform-gp.onrender.com'

const PUBLIC_API_PATHS = new Set([
  '/api/v1/login',
  '/api/v1/registration',
  '/api/v1/token/resend',
  '/api/v1/token/verify',
  '/api/v1/token/verify-change',
  '/api/v1/forgot-password',
  '/api/v1/reset-password',
])

function getRequestPath(url) {
  if (!url) {
    return ''
  }

  try {
    return new URL(url, API_BASE_URL).pathname
  } catch {
    return ''
  }
}

function isPublicApiRequest(url) {
  return PUBLIC_API_PATHS.has(getRequestPath(url))
}

export const http = axios.create({
  baseURL: API_BASE_URL,
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token && !isPublicApiRequest(config.url)) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    const isPublicRequest = isPublicApiRequest(error?.config?.url)

    if (status === 401 && !isPublicRequest) {
      localStorage.removeItem('token')
      window.location.assign('/login')
      return Promise.reject(error)
    }

    const payload = {
      path: window.location.pathname,
      status: status ? String(status) : 'NETWORK_ERROR',
      message:
        error?.response?.data?.message ||
        error?.message ||
        'حدث خطأ غير متوقع',
      time: new Date().toISOString(),
    }

    const encoded = encodeURIComponent(JSON.stringify(payload))
    window.location.assign(`/error?data=${encoded}`)
    return Promise.reject(error)
  },
)

