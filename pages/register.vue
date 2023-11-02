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
          v-model="name"
          name="name"
          label="Nome"
          placeholder="Insira seu nome"
          type="text"
        >
          <ErrorItem :error="errors.name" />
        </InputItem>
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
          v-model="username"
          name="username"
          label="Nome de usuario"
          placeholder="Digite um nome"
          type="text"
        >
          <ErrorItem :error="errors.username" />
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
        <InputItem
          v-model="confirm"
          name="confirm"
          label="Confirmar senha"
          placeholder="Digite sua senha novamente"
          type="password"
        >
          <ErrorItem :error="errors.confirm" />
        </InputItem>
        <ErrorItem :error="errorMsg" />
        <button class="btn w-full" :disabled="JSON.stringify(errors) !== '{}'">
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

<script setup>
import { useForm, useField } from 'vee-validate'
import * as zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
useHead({
  title: 'Criar conta'
})
definePageMeta({
  layout: false
})
const { add } = useNotification()
const route = useRouter()

const usernameList = ref([])
const validationSchema = toTypedSchema(
  zod
    .object({
      email: zod
        .string({
          required_error: 'O email é obrigatório'
        })
        .min(1, { message: 'O email é obrigatório' })
        .email({ message: 'O email deve ser válido' }),
      username: zod.string({ required_error: 'O nome de usuário é obrigatório' }).min(1, { message: 'O nome de usuário é obrigatório' }).refine(value => !usernameList.value.includes(value), {
        message: 'O nome de usuário já está em uso',
        path: ['username']
      }),
      name: zod.string({ required_error: 'O nome é obrigatório' }).min(1, { message: 'O nome é obrigatório' }),
      password: zod
        .string({
          required_error: 'A senha é obrigatória'
        })
        .min(1, { message: 'A senha é obrigatória' })
        .min(8, 'A senha deve conter no mínimo 8 caracteres'),
      confirm: zod
        .string({
          required_error: 'A confirmação de senha é obrigatória'
        })
        .min(1, { message: 'A confirmação de senha é obrigatória' })
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

const signUp = async (email, password, username, name) => {
  try {
    loading.value = true
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    if (error) {
      throw error
    }
    if (data) {
      await insertProfile(email, data.user?.id, username, name)
      await insertSocials(data.user?.id)
    }
    await route.push('/')
  } catch (error) {
    if (error.status === 400 && error.name === 'AuthApiError') {
      add({
        message: 'Email já cadastrado!',
        type: 'error'
      })
    } else {
      add({
        message: 'Erro ao criar conta!',
        type: 'error'
      })
    }
  } finally {
    loading.value = false
  }
}

const insertProfile = async (email, id, username, name) => {
  try {
    const { error } = await supabase.from('profiles').insert({
      email,
      id,
      username,
      name
    })
    if (error) {
      throw error
    }
  } catch (error) {
    errorMsg.value = error.message
    setTimeout(() => {
      errorMsg.value = ''
    }, 5000)
  }
}

const getAllUsernames = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('username')

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

const insertSocials = async (id) => {
  try {
    const { error } = await supabase.from('socials').insert({
      id
    })
    if (error) {
      throw error
    }
  } catch (error) {
    errorMsg.value = error.message
    setTimeout(() => {
      errorMsg.value = ''
    }, 5000)
  }
}

onMounted(async () => {
  usernameList.value = (await getAllUsernames()).map(item => item.username)
})

const errorMsg = ref('')
const loading = ref(false)

const onSubmit = handleSubmit((values) => {
  signUp(values.email, values.password, values.username, values.name)
})

const { value: email } = useField('email')
const { value: name } = useField('name')
const { value: username } = useField('username')
const { value: password } = useField('password')
const { value: confirm } = useField('confirm')
</script>
