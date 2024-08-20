<script setup>
const notifyStore = useNotifyStore()

const icon = ref({
  success: 'mdi-check-circle',
  error: 'mdi-alert-circle',
  warning: 'mdi-alert',
  info: 'mdi-information',
})
</script>
<template>
  <v-snackbar
    :model-value="true"
    :color="noti.type"
    location="top right"
    :key="noti.id"
    :style="{ top: `${index * 60}px` }"
    close-on-content-click
    v-for="(noti, index) in notifyStore.notifications"
  >
    <v-icon>{{ icon[noti.type] }}</v-icon> {{ noti.message }}
  </v-snackbar>
</template>
