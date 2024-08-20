<script setup>
import useAuthAPI from '@/modules/auth/api/auth.api'

const { t } = useI18n()
const authAPI = useAuthAPI()
const rules = useRules()
const router = useRouter()

const title = computed(() => t('title'))
useTitle(title)

const baseForm = ref()
const loading = ref(false)
const form = reactive({
  email: '',
  password: '',
})

async function submit() {
  const { valid } = await baseForm.value.validate()
  if (!valid) return
  try {
    loading.value = true
    await authAPI.login({
      email: form.email,
      password: form.password,
    })
    router.replace({ name: 'home' })
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <v-container>
    <div class="tw-grid tw-place-items-center tw-min-h-screen">
      <v-card class="tw-min-w-full">
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>
          <v-form ref="baseForm" :disabled="loading" @submit.prevent="submit()">
            <v-text-field
              v-model="form.email"
              :rules="[rules.required]"
              :label="t('email')"
            />
            <v-text-field
              type="password"
              v-model="form.password"
              :rules="[rules.required]"
              :label="t('password')"
            />
            <v-btn type="submit" color="primary" :loading="loading">{{
              t('login')
            }}</v-btn>
            <v-btn
              class="ml-2"
              :to="{ name: 'auth-register' }"
              :loading="loading"
              >{{ t('register') }}</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>
<i18n lang="yaml">
th:
  title: เข้าสู่ระบบ
  email: อีเมล
  password: รหัสผ่าน
  register: ลงทะเบียน
  login: เข้าสู่ระบบ
en:
  title: Login
  email: Email
  password: Password
  register: ลงทะเบียน
  login: Login
</i18n>
