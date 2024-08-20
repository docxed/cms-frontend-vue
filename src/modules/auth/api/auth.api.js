export default function useAuthAPI() {
  const auth = useAuthStore()

  const register = async (payload) => {
    const res = await $httpNoAuth.post('/auth/register', payload)
    return res.data
  }
  const login = async (payload) => {
    const res = await $httpNoAuth.post('/auth/login', payload)
    await auth.setTokens(res.data.access_token, res.data.refresh_token)
  }
  const getMe = async () => {
    const res = await $http.get('/auth/me')
    return res.data
  }
  const refresh = async () => {
    const res = await $httpNoAuth.post('/auth/refresh-token', {
      refresh_token: auth.refresh_token,
    })
    return res.data
  }

  return { register, login, getMe, refresh }
}
