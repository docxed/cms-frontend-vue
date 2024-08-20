<script setup>
import useAuthAPI from '@/modules/auth/api/auth.api.js'

const { t } = useI18n()
const rules = useRules()
const router = useRouter()
const authAPI = useAuthAPI()
const notify = useNotifyStore()
const loader = useLoaderStore()

const title = computed(() => t('title'))
useTitle(title)

const baseForm = ref()
const form = reactive({
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
})

async function submit() {
  const { valid } = await baseForm.value.validate()
  if (!valid) return
  try {
    loader.start()
    await authAPI.register({
      email: form.email,
      firstname: form.firstName,
      lastname: form.lastName,
      password: form.password,
      confirm_password: form.confirmPassword,
    })
    notify.success(t('notification.save_success'))
    router.push({ name: 'auth-login' })
  } catch (err) {
    console.error(err)
  } finally {
    loader.stop()
  }
}
</script>
<template>
  <v-container>
    <div class="tw-grid tw-place-items-center tw-min-h-screen">
      <v-card class="tw-min-w-full">
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>
          <v-form ref="baseForm" @submit.prevent="submit()">
            <v-text-field
              type="email"
              v-model="form.email"
              :rules="[rules.required, rules.email, rules.maxLength(100)]"
              :label="t('email')"
            />
            <div class="tw-grid tw-grid-cols-2 tw-gap-2">
              <v-text-field
                v-model="form.firstName"
                :rules="[rules.required, rules.maxLength(100)]"
                :label="t('firstName')"
              />
              <v-text-field
                v-model="form.lastName"
                :rules="[rules.required, rules.maxLength(100)]"
                :label="t('lastName')"
              />
            </div>
            <v-text-field
              type="password"
              v-model="form.password"
              :rules="[rules.required, rules.minLength(6), rules.maxLength(20)]"
              :label="t('password')"
            />
            <v-text-field
              type="password"
              v-model="form.confirmPassword"
              :rules="[rules.required, rules.sameAs(form.password)]"
              :label="t('confirmPassword')"
            />
            <v-btn type="submit" color="primary">{{ t('register') }}</v-btn>
            <v-btn class="ml-2" :to="{ name: 'auth-login' }">{{
              t('login')
            }}</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>
<i18n lang="yaml">
th:
  title: ลงทะเบียน
  email: อีเมล
  firstName: ชื่อ
  lastName: นามสกุล
  password: รหัสผ่าน
  confirmPassword: ยืนยันรหัสผ่าน
  register: ลงทะเบียน
  login: เข้าสู่ระบบ
en:
  title: Register
  email: Email
  firstName: First name
  lastName: Last name
  password: Password
  confirmPassword: Confirm password
  register: Register
  login: Login
</i18n>
