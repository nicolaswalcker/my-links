<template>
  <section class="flex h-screen w-full items-center justify-center bg-base-200">
    <article
      class="prose flex h-full w-full flex-col items-start justify-center gap-4 rounded-md bg-base-100 p-5 sm:h-auto sm:max-w-[450px]"
    >
      <div class="flex flex-col items-start justify-start gap-3">
        <h1 class="text-4xl font-bold">
          Entrar
        </h1>
        <p class="opacity-75">
          Que legal te ver novamente!
        </p>
      </div>
      <form
        class="flex w-full flex-col items-start justify-center gap-4"
        @submit.prevent="onSubmit"
      >
        <InputItem
          v-model="email"
          name="email"
          label="Email"
          placeholder="johndoe@email.com"
          type="email"
        >
          <ErrorItem :error="errors.email" />
        </InputItem>
        <InputItem
          v-model="password"
          name="password"
          label="Senha"
          placeholder="Digite sua senha"
          type="password"
        >
          <ErrorItem :error="errors.password" />
        </InputItem>
        <div class="flex w-full flex-wrap items-center justify-between gap-3">
          <div class="flex gap-2">
            <input
              id="remember"
              v-model="remember"
              name="remember"
              type="checkbox"
              class="checkbox"
            >
            <label for="remember">Lembrar de mim</label>
          </div>
          <a href="#" class="link">Esqueci minha senha</a>
        </div>
        <ErrorItem :error="errorMsg" />
        <button class="btn w-full">
          <icon v-if="loading" name="svg-spinners:8-dots-rotate" />
          <span v-else>Entrar</span>
        </button>
      </form>
      <p class="self-center">
        Não tem uma conta?
        <NuxtLink class="link" to="/register">
          Criar uma!
        </NuxtLink>
      </p>
    </article>
  </section>
</template>

<script setup>
import { useForm, useField } from 'vee-validate'
import * as zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useStorage } from '@vueuse/core'
useHead({
  title: 'Entrar'
})
definePageMeta({
  layout: false
})

const { add } = useNotification()

const validationSchema = toTypedSchema(
  zod.object({
    email: zod
      .string({
        required_error: 'O email é obrigatório'
      })
      .min(1, { message: 'O email é obrigatório' })
      .email({ message: 'O email deve ser válido' }),
    password: zod
      .string({
        required_error: 'A senha é obrigatória'
      })
      .min(1, { message: 'A senha é obrigatória' })
  })
)

const { handleSubmit, errors } = useForm({
  validationSchema
})

const supabase = useSupabaseClient()
const errorMsg = ref('')
const loading = ref(false)
const router = useRouter()
const { value: email } = useField('email')
const { value: password } = useField('password')
const remember = useStorage('remember', false)

const signIn = async (email, password) => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      throw error
    }
    if (remember.value) {
      localStorage.setItem('email', email)
    } else {
      localStorage.removeItem('email')
    }
    await router.push('/')
  } catch (error) {
    if (error.status === 400 && error.name === 'AuthApiError') {
      add({
        message: 'Email ou senha incorretos',
        type: 'error'
      })
      localStorage.removeItem('email')
      remember.value = false
    } else {
      add({
        message: 'Ocorreu um erro ao fazer login',
        type: 'error'
      })
    }
  } finally {
    loading.value = false
  }
}

const onSubmit = handleSubmit((values) => {
  signIn(values.email, values.password)
})
onMounted(() => {
  if (remember.value) {
    const storageEmail = localStorage.getItem('email')
    if (remember.value && storageEmail) {
      email.value = storageEmail
    }
  }
})
</script>
