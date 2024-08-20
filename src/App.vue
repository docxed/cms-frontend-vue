<script setup>
const auth = useAuthStore()
</script>
<template>
  <v-app>
    <MenuBar v-if="auth.isAuthenticated" />
    <router-view />
    <NotificationBar />
    <LoaderBar />
  </v-app>
</template>
