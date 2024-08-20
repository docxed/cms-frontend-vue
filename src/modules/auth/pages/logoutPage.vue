<script setup>
const auth = useAuthStore()
const router = useRouter()
onBeforeMount(() => {
  auth.logout()
  router.replace({ name: 'auth-login' })
})
</script>
<template></template>
