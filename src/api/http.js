import axios from 'axios'

const API_BASE_URL =
  import.meta?.env?.VITE_API_BASE_URL || 'https://real-estate-platform-gp.onrender.com'

export const http = axios.create({
  baseURL: API_BASE_URL,
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status

    if (status === 401) {
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

