<script setup>
const model = defineModel()

const props = defineProps({
  title: {
    type: String,
  },
  icon: {
    type: String,
  },
})
</script>
<template>
  <v-dialog v-model="model" v-bind="$attrs" persistent max-width="620px">
    <v-card :title="props.title" :prepend-icon="props.icon">
      <template v-slot:append>
        <v-icon icon="mdi-close" @click.stop="model = false"></v-icon>
      </template>
      <v-card-text>
        <slot></slot>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
