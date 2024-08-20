export const authGuard = (to, from, next) => {
  const auth = useAuthStore()

  if (!auth.isAuthenticated) {
    return next({ name: 'auth-login' })
  }

  return next()
}

export const guestGuard = (to, from, next) => {
  const auth = useAuthStore()

  if (auth.isAuthenticated) {
    return next({ name: 'home' })
  }

  return next()
}
