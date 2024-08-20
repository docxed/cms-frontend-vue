<script setup>
const router = useRouter()
const auth = useAuthStore()
onBeforeMount(() => {
  if (auth.isAuthenticated) {
    router.replace({ name: 'home' })
  } else {
    router.replace({ name: 'auth-login' })
  }
})
</script>
<template></template>
