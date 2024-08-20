<script setup>
import useBlogAPI from '@/modules/blog/api/blog.api.js'

const DEFAULT_FORM = {
  title: '',
  description: '',
}
const { t } = useI18n()
const rules = useRules()
const blogAPI = useBlogAPI()
const notify = useNotifyStore()
const emit = defineEmits(['close'])

const props = defineProps({
  isUpdate: Boolean,
  updateItem: Object,
})

const baseForm = ref()
const loading = ref(false)
let form = reactive(objClone(DEFAULT_FORM))

async function onUpdate() {
  try {
    loading.value = true
    await blogAPI.update(props.updateItem._id, form)
    notify.success(t('notification.save_success'))
    reset()
    emit('close')
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}
async function onCreate() {
  try {
    loading.value = true
    await blogAPI.create(form)
    notify.success(t('notification.save_success'))
    reset()
    emit('close')
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}
async function submit() {
  const { valid } = await baseForm.value.validate()
  if (!valid) return
  if (props.isUpdate) {
    onUpdate()
  } else {
    onCreate()
  }
}
function reset() {
  form = objClone(DEFAULT_FORM)
  baseForm.value.reset()
}
function setterItem() {
  for (const key in form) {
    if (props.updateItem[key]) {
      form[key] = props.updateItem[key]
    }
  }
}

onBeforeMount(() => {
  if (props.isUpdate) {
    setterItem()
  }
})
</script>
<template>
  <v-form ref="baseForm" :disabled="loading" @submit.prevent>
    <v-text-field
      v-model="form.title"
      label="Title"
      :rules="[rules.required, rules.maxLength(100)]"
    />
    <v-textarea
      v-model="form.description"
      label="Description"
      :rules="[rules.maxLength(500)]"
      auto-grow
      rows="2"
      max-rows="5"
      variant="outlined"
    />
    <v-btn type="submit" color="primary" :loading="loading" @click="submit()"
      >Save</v-btn
    >
  </v-form>
</template>
