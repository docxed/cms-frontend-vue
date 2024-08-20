<script setup>
const loaderStore = useLoaderStore()
</script>
<template>
  <v-dialog v-model="loaderStore.loading" persistent max-width="320">
    <v-list color="primary" elevation="12" rounded="lg">
      <v-list-item :title="loaderStore.message">
        <template v-slot:append>
          <v-progress-circular
            color="primary"
            indeterminate="disable-shrink"
          ></v-progress-circular>
        </template>
      </v-list-item>
    </v-list>
  </v-dialog>
</template>
