<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
    default: 'mdi-information',
  },
})
const { isRevealed, reveal, confirm, cancel } = useConfirmDialog()

defineExpose({
  reveal,
  confirm,
  cancel,
})
</script>
<template>
  <v-dialog v-model="isRevealed" v-bind="$attrs" persistent max-width="620px">
    <v-card :title="props.title" :prepend-icon="props.icon">
      <template v-slot:append>
        <v-icon icon="mdi-close" @click.stop="cancel"></v-icon>
      </template>
      <v-card-text>
        {{ props.description }}
      </v-card-text>
      <v-card-actions>
        <slot name="actions" v-bind="{ confirm, cancel }">
          <v-btn color="primary" @click="confirm">Confirm</v-btn>
          <v-btn @click="cancel">Cancel</v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
