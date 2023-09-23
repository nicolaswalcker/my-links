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

<script lang="ts" setup>
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { useStorage } from '@vueuse/core'
useHead({
  title: 'Entrar'
})
definePageMeta({
  layout: false
})

const validationSchema = toTypedSchema(
  zod.object({
    email: zod
      .string({
        required_error: 'O email é obrigatório'
      })
      .nonempty({ message: 'O email é obrigatório' })
      .email({ message: 'O email deve ser válido' }),
    password: zod
      .string({
        required_error: 'A senha é obrigatória'
      })
      .nonempty({ message: 'A senha é obrigatória' })
  })
)

const { handleSubmit, errors } = useForm({
  validationSchema
})

const supabase = useSupabaseClient()
const errorMsg = ref('')
const loading = ref(false)
const router = useRouter()
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const remember = useStorage('remember', false)

const signIn = async (email: string, password: string) => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      throw error
    }

    await router.push('/')
  } catch (error: any) {
    errorMsg.value = error.message
  } finally {
    if (remember.value) {
      localStorage.setItem('email', email)
    } else {
      localStorage.removeItem('email')
    }
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
