<script setup>
const route = useRoute()
</script>
<template>
  <v-main>
    <p>Home page</p>
    <router-view :key="route.fullPath" />
  </v-main>
</template>
