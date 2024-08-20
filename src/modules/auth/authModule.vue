<script setup>
const route = useRoute()
</script>
<template>
  <v-main class="tw-min-h-screen tw-bg-[#f1f1f1]">
    <router-view :key="route.fullPath" />
  </v-main>
</template>
