<template>
  <section class="flex h-screen w-full items-center justify-center bg-base-200">
    <article
      class="flex h-full w-full flex-col items-start justify-center gap-4 rounded-md bg-base-100 p-5 sm:h-auto sm:max-w-[450px]"
    >
      <div class="flex flex-col items-start justify-start gap-3">
        <h1 class="text-4xl font-bold">
          Criar nova conta
        </h1>
        <p class="opacity-75">
          Vamos começar a mostrar seus links para o mundo?
        </p>
      </div>
      <form
        class="flex w-full flex-col items-start justify-center gap-4"
        @submit.prevent="onSubmit"
      >
        <InputItem
          v-model="email"
          :error="errors.email"
          name="email"
          label="Email"
          placeholder="johndoe@email.com"
          type="email"
        >
          <ErrorItem :error="errors.email" />
        </InputItem>
        <InputItem
          v-model="password"
          :error="errors.password"
          name="password"
          label="Senha"
          placeholder="Digite sua senha"
          type="password"
        >
          <ErrorItem :error="errors.password" />
        </InputItem>
        <InputItem
          v-model="confirm"
          :error="errors.confirm"
          name="confirm"
          label="Confirmar senha"
          placeholder="Digite sua senha novamente"
          type="password"
        >
          <ErrorItem :error="errors.confirm" />
        </InputItem>
        <ErrorItem :error="errorMsg" />
        <button class="btn w-full">
          <icon v-if="loading" name="svg-spinners:8-dots-rotate" />
          <span v-else>Criar conta</span>
        </button>
      </form>
      <p class="self-center">
        Já uma conta?
        <NuxtLink class="link" to="/login">
          Entre aqui!
        </NuxtLink>
      </p>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
useHead({
  title: 'Criar conta'
})
definePageMeta({
  layout: false
})
const route = useRouter()
const validationSchema = toTypedSchema(
  zod
    .object({
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
        .min(8, 'A senha deve conter no mínimo 8 caracteres'),
      confirm: zod
        .string({
          required_error: 'A confirmação de senha é obrigatória'
        })
        .nonempty({ message: 'A confirmação de senha é obrigatória' })
    })
    .refine(data => data.password === data.confirm, {
      message: 'As senhas não coincidem',
      path: ['confirm']
    })
)

const { handleSubmit, errors } = useForm({
  validationSchema
})

const supabase = useSupabaseClient()

const signUp = async (email: string, password: string) => {
  try {
    loading.value = true
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    if (data) {
      await insertProfile(email, data.user?.id as string)
    }
    if (error) {
      throw error
    }
    await route.push('/')
  } catch (error: any) {
    errorMsg.value = error.message
    setTimeout(() => {
      errorMsg.value = ''
    }, 5000)
  } finally {
    loading.value = false
  }
}

const insertProfile = async (email: string, id: string) => {
  try {
    const { error } = await supabase.from('profiles').insert({
      email,
      id
    } as any).select('*') // TODO: type this any
    if (error) { throw error }
  } catch (error: any) {
    errorMsg.value = error.message
    setTimeout(() => {
      errorMsg.value = ''
    }, 5000)
  }
}

const errorMsg = ref('')
const loading = ref(false)

const onSubmit = handleSubmit((values) => {
  signUp(values.email, values.password)
})

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const { value: confirm } = useField<string>('confirm')
</script>
