<template>
  <section
    class="flex h-auto min-h-[calc(100vh-88px)] w-full items-start justify-end gap-4 bg-base-200 transition-all md:p-4"
  >
    <div class="relative hidden w-[40%] md:block">
      <div
        class="flex h-full max-h-[750px] w-[calc(40%-16px)] items-center justify-center rounded-lg bg-base-100 p-6 md:fixed"
        :data-theme="theme"
      >
        <img
          class="absolute left-1/2 -translate-x-1/2"
          src="@/assets/images/illustration-phone-mockup.svg"
          aria-hidden="true"
          alt="Ilustração de um celular"
        >
        <div
          class="z-10 flex h-full w-full max-w-[300px] flex-col items-center justify-center gap-8"
        >
          <div
            class="flex w-full flex-col items-center justify-center gap-1 overflow-hidden px-6"
          >
            <img
              v-if="fileDisplay"
              class="h-28 w-28 rounded-full object-cover"
              :src="fileDisplay"
              alt="aa"
            >
            <div v-else class="h-28 w-28 rounded-full bg-base-300" />
            <p
              v-if="name"
              class="w-full truncate text-center font-semibold text-base-content"
            >
              {{ name }}
            </p>
            <div v-else class="h-6 w-24 rounded-full bg-base-300" />
            <p
              v-if="username"
              class="w-full truncate text-center text-base-content/60"
            >
              {{ username }}
            </p>
            <div v-else class="h-6 w-36 rounded-full bg-base-300" />
            <NuxtLink
              v-if="email"
              external
              :href="`mailto:${email}`"
              class="link-success w-full truncate text-center"
            >
              {{ email }}
            </NuxtLink>
            <span v-else class="h-6 w-36 rounded-full bg-base-300" />
          </div>
          <div class="flex w-full flex-col items-center justify-center gap-4">
            <div
              v-for="(item, index) in 5"
              :key="index"
              class="h-12 min-w-[230px] rounded-sm bg-base-300"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex h-full w-full flex-col items-start justify-start gap-7 rounded-lg bg-base-100 p-6 md:w-[60%]"
    >
      <div class="flex flex-col items-start justify-start gap-3">
        <h1 class="text-4xl font-bold">
          Detalhes do perfil
        </h1>
        <p class="opacity-75">
          Deixe o seu perfil com sua cara e fale um pouco de você!
        </p>
      </div>
      <form class="flex w-full flex-col items-start justify-center gap-6" @submit.prevent="onSubmit">
        <div class="flex w-full flex-col items-start justify-center gap-2">
          <div
            class="flex w-full flex-col items-start justify-between gap-3 rounded-md bg-base-200 p-5 md:flex-row md:items-center"
          >
            <p class="text-left text-lg font-semibold text-base-content">
              Foto de perfil
            </p>
            <div
              class="flex w-full flex-col items-start justify-start gap-6 md:w-[65%] md:flex-row md:items-center"
            >
              <div class="flex flex-col items-start justify-start gap-3">
                <input
                  id="image"
                  hidden
                  accept=".jpg, .png, .bmp"
                  type="file"
                  name="image"
                  @input="onChange"
                >
                <label
                  v-if="!fileDisplay"
                  class="group flex h-40 w-40 cursor-pointer items-center justify-center"
                  for="image"
                  @dragover.prevent=""
                  @drop.prevent="onDrop"
                >
                  <div
                    class="flex h-full w-full flex-col items-center justify-center rounded-lg bg-base-300 transition-colors group-hover:bg-accent"
                  >
                    <Icon name="ic:baseline-add-photo-alternate" size="48" />
                    <p>Adicionar imagem</p>
                  </div>
                </label>
                <label
                  v-else
                  class="group relative flex h-40 w-40 cursor-pointer items-center justify-center"
                  for="image"
                >
                  <img
                    class="h-40 w-40 cursor-pointer rounded-lg bg-cover object-cover"
                    :src="fileDisplay"
                    alt="aa"
                  >
                  <div
                    class="absolute left-0 top-0 flex h-40 w-40 flex-col items-center justify-center rounded-lg bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Icon name="ic:baseline-add-photo-alternate" size="48" />
                    <p class="font-semibold">Alterar imagem</p>
                  </div>
                </label>
                <button v-if="fileDisplay" class="link" @click="clearImage">
                  Remover imagem
                </button>
                <ErrorItem :error="errorType" />
              </div>
              <p>
                A imagem deve ter até <strong>1024x1024px</strong>. <br>
                Utilize
                <span class="font-semibold text-base-content">PNG</span>,
                <span class="font-semibold text-base-content">JPG</span> ou
                <span class="font-semibold text-base-content">BMP</span>.
              </p>
            </div>
          </div>
          <div
            class="flex w-full flex-col items-start justify-center gap-3 rounded-md bg-base-200 p-5"
          >
            <InputItem v-model="name" label="Nome completo" name="name" :is-row="true" />
            <ErrorItem :error="errors.name" />
            <InputItem v-model="username" label="Usuário" name="username" :is-row="true" />
            <ErrorItem :error="errors.username" />
            <InputItem v-model="email" label="Email" type="email" name="email" :is-row="true" />
            <ErrorItem :error="errors.email" />
            <div
              class="flex w-full flex-col items-start justify-between md:flex-row md:items-center"
            >
              <label class="label" for="theme">Tema</label>
              <div class="flex w-full flex-col items-start justify-center md:w-[65%]">
                <select
                  id="theme"
                  v-model="theme"
                  class="input input-bordered w-full capitalize"
                >
                  <option
                    v-for="(themeItem, index) in themesList"
                    :key="index"
                    class="capitalize"
                    :value="themeItem"
                  >
                    {{ themeItem }}
                  </option>
                </select>
                <small class="text-base-content">Temas baseados nos temas do <NuxtLink class="link" target="_blank" external href="https://daisyui.com/docs/themes/">DaisyUI</NuxtLink></small>
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-primary self-end">
          Salvar
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import * as zod from 'zod'
import { useForm, useField } from 'vee-validate'
definePageMeta({
  middleware: 'auth'
})
const themesList = ref([
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter'
])

useHead({
  title: 'Perfil'
})
const validationSchema =
  zod.object({
    name: zod.string({
      required_error: 'O nome é obrigatório'
    }).nonempty({
      message: 'O nome é obrigatório'
    }),
    username: zod.string({
      required_error: 'O usuário é obrigatório'
    }).nonempty({
      message: 'O nome de usuário é obrigatório'
    }),
    email: zod.string({
      invalid_type_error: 'O email deve ser válido',
      required_error: 'O email é obrigatório'
    }).email({
      message: 'O email deve ser válido'
    }).nonempty({
      message: 'O email é obrigatório'
    })
  })

const { handleSubmit, errors } = useForm({
  validationSchema
})

const { value: name } = useField('name')
const { value: username } = useField('username')
const { value: email } = useField('email')
const theme = ref('light')
const userAvatar = ref('')

const file = ref(null)
const fileDisplay = ref('')
const fileData = ref()
const errorType = ref('')

const onChange = (e) => {
  errorType.value = ''
  if (!e.target.files[0]) {
    return
  }
  fileDisplay.value = URL.createObjectURL(e.target.files[0])
  fileData.value = e.target.files[0]
}

const onDrop = (e) => {
  errorType.value = ''
  file.value = e.dataTransfer.files[0]
  const extention = file.value.name.substring(
    file.value.name.lastIndexOf('.') + 1
  )
  if (extention !== 'png' && extention !== 'jpg' && extention !== 'jpeg') {
    errorType.value = 'Tipo de arquivo inválido'
    return
  }

  fileDisplay.value = URL.createObjectURL(e.dataTransfer.files[0])
  fileData.value = e.dataTransfer.files[0]
}

const clearImage = () => {
  fileDisplay.value = ''
  fileData.value = null
  file.value = null
}

const supabase = useSupabaseClient()

const uploadAvatar = async () => {
  const fileExt = fileData.value?.name.split('.').pop()
  const filePath = fileData.value ? `${Math.random()}.${fileExt}` : ''
  try {
    const { error } = await supabase.storage.from('profiles').upload(filePath, fileData.value)

    if (error) {
      throw error
    }

    userAvatar.value = filePath
  } catch (error) {
    console.log(error)
  }
}

const user = useSupabaseUser()

const uploadUser = async (name, username, email, theme) => {
  try {
    const { error } = await supabase.from('profiles').update({
      name,
      username,
      email,
      theme,
      avatar_url: userAvatar.value
    }).eq('id', user.value?.id).select()
    if (error) {
      throw error
    }
  } catch (error) {
    console.log(error)
  }
}

const onSubmit = handleSubmit(async (values) => {
  if (!fileDisplay.value) {
    errorType.value = 'Selecione uma imagem'
    return
  }
  if (!userAvatar.value || fileData.value) {
    await uploadAvatar()
  }
  await uploadUser(values.name, values.username, values.email, theme.value)
})

const getUserData = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('name, username, email, theme, avatar_url').eq('id', user.value?.id)

    if (error) {
      throw error
    }

    if (data) {
      name.value = data[0].name
      username.value = data[0].username
      email.value = data[0].email
      theme.value = data[0].theme ?? 'light'
      userAvatar.value = data[0].avatar_url ?? ''
    }
  } catch (error) {
    console.log(error)
  }
}
const downloadUserImage = async () => {
  try {
    const { data, error } = await supabase.storage.from('profiles').download(userAvatar.value)

    if (error) {
      throw error
    }

    if (data) {
      const url = URL.createObjectURL(data)
      fileDisplay.value = url
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await getUserData()
  downloadUserImage()
})
</script>
