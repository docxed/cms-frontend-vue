import axios from 'axios'

import { BASE_URL } from '@/constants'

const $httpNoAuth = axios.create({
  baseURL: BASE_URL,
})
const $http = axios.create({
  baseURL: BASE_URL,
})

$http.interceptors.request.use(
  (config) => {
    const auth = useAuthStore()
    const token = auth.access_token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)
$http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const auth = useAuthStore()
    const notify = useNotifyStore()
    const router = useRouter()

    if (
      error.response &&
      error.response.data.statusCode === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      try {
        await auth.refreshTokens()
        originalRequest.headers.Authorization = `Bearer ${auth.access_token}`
        return $http(originalRequest)
      } catch (err) {
        auth.logout()
        router.replace({ name: 'auth-login' })
        return Promise.reject(err)
      }
    }
    notify.error(error.response.data.message)
    console.error(error.response.data)
    return Promise.reject(error)
  }
)
$httpNoAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    const notify = useNotifyStore()
    notify.error(error.response.data.message)
    return Promise.reject(error)
  }
)

export { $httpNoAuth, $http }
