<template>
  <section
    class="relative flex h-auto min-h-[calc(100vh-88px)] w-full items-start justify-end gap-4 overflow-x-hidden bg-base-200 transition-all md:p-4"
  >
    <div class="relative hidden w-[40%] md:block">
      <div
        class="flex h-full max-h-[750px] w-[calc(40%-16px)] items-center justify-center rounded-lg bg-base-100 p-6 md:fixed"
      >
        <div class="absolute left-1/2 -translate-x-1/2">
          <ProfileCard
            :profile-name="name"
            :profile-email="email"
            :profile-username="username"
            :profile-avatar="fileDisplay"
            :social-links="socialLinks"
            :profile-theme="theme"
          />
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
      <form
        class="flex w-full flex-col items-start justify-center gap-6"
        @submit.prevent="onSubmit"
      >
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
            <InputItem
              v-model="name"
              label="Nome completo"
              name="name"
              :is-row="true"
            />
            <ErrorItem :error="errors.name" />
            <InputItem
              v-model="username"
              label="Usuário"
              name="username"
              :is-row="true"
              @keydown.space.prevent
            />
            <ErrorItem :error="errors.username" />
            <InputItem
              v-model="email"
              label="Email"
              type="email"
              name="email"
              :is-row="true"
            />
            <ErrorItem :error="errors.email" />
            <div
              class="flex w-full flex-col items-start justify-between md:flex-row md:items-center"
            >
              <label class="label" for="theme">Tema</label>
              <div
                class="flex w-full flex-col items-start justify-center md:w-[65%]"
              >
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
                <small class="text-base-content">Temas baseados nos temas do
                  <NuxtLink
                    class="link"
                    target="_blank"
                    external
                    href="https://daisyui.com/docs/themes/"
                  >DaisyUI</NuxtLink></small>
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-primary self-end" :disabled="haveDifference()">
          <Icon v-if="saving" name="svg-spinners:8-dots-rotate" size="24" />
          <span v-else>Salvar</span>
        </button>
      </form>
    </div>
    <article
      ref="og"
      class="absolute left-full z-0 flex h-[600px] w-[1200px] flex-col items-center justify-center gap-3 border-none bg-primary
    "
    >
      <img :src="fileDisplay" alt="image" class="h-28 w-28 rounded-full border-none object-cover">
      <h1 class="border-none text-3xl font-semibold text-primary-content">
        @{{ username }}
      </h1>
    </article>
  </section>
</template>

<script setup>
import * as zod from 'zod'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import domtoimage from 'dom-to-image-more'
import { decode } from 'base64-arraybuffer'
const og = ref(null)
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
const { add } = useNotification()

const savedItems = ref({})

useHead({
  title: 'Perfil'
})

const validationSchema = toTypedSchema(zod.object({
  name: zod.string({
    required_error: 'O nome é obrigatório'
  }).min(1, {
    message: 'O nome é obrigatório'
  }),
  username: zod.string({
    required_error: 'O usuário é obrigatório'
  }).min(1, {
    message: 'O nome de usuário é obrigatório'
  }),
  email: zod.string({
    invalid_type_error: 'O email deve ser válido',
    required_error: 'O email é obrigatório'
  }).email({
    message: 'O email deve ser válido'
  }).min(1, {
    message: 'O email é obrigatório'
  })
}))

const { handleSubmit, errors } = useForm({
  validationSchema
})

const slug = computed(() => {
  return username.value?.trim().toLowerCase().replace(/\s/g, '-')
})

const { value: name } = useField('name')
const { value: username } = useField('username')
const { value: email } = useField('email')
const theme = ref('light')
const userAvatar = ref('')
const socialLinks = ref([])
const saving = ref(false)

const file = ref(null)
const fileDisplay = ref('')
const fileData = ref()
const errorType = ref('')
const filePath = ref('')
const fileNameToSend = ref('')

const onChange = (e) => {
  errorType.value = ''
  if (!e.target.files[0]) {
    return
  }
  fileDisplay.value = URL.createObjectURL(e.target.files[0])
  fileData.value = e.target.files[0]
  const fileExt = fileData.value?.name.split('.').pop()
  filePath.value = fileData.value ? `${Math.random()}.${fileExt}` : ''
  fileNameToSend.value = fileData.value ? `${user.value?.id}.${fileExt}` : ''
}

const onDrop = (e) => {
  errorType.value = ''
  file.value = e.dataTransfer.files[0]
  const extention = file.value.name.substring(
    file.value.name.lastIndexOf('.') + 1
  )
  if (extention !== 'png' && extention !== 'jpg' && extention !== 'jpeg') {
    add({
      message: 'Formato de imagem inválido',
      type: 'error'
    })
    return
  }

  fileDisplay.value = URL.createObjectURL(e.dataTransfer.files[0])
  fileData.value = e.dataTransfer.files[0]
  const fileExt = fileData.value?.name.split('.').pop()
  filePath.value = fileData.value ? `${Math.random()}.${fileExt}` : ''
  fileNameToSend.value = fileData.value ? `${user.value?.id}.${fileExt}` : ''
}

const clearImage = () => {
  fileDisplay.value = ''
  fileData.value = null
  file.value = null
}

const imageIsOnStorage = async () => {
  const { data, error } = await supabase.storage.from('profiles').list()

  if (error) {
    throw error
  }

  const files = data.filter(file => file.name.slice(0, -4) === userAvatar.value.slice(0, -4))

  return files.length > 0
}

const uploadOg = async (files, imageName, imageFile) => {
  if (files.length > 0) {
    await supabase.storage.from('og').remove(files[0].name)
  }

  await supabase.storage.from('og').upload(imageName, decode(imageFile), {
    contentType: 'image/png',
    cacheControl: '300',
    upsert: true
  })
}
const base64 = ref('')
const ogName = ref('')
const upProfileImage = async () => {
  const imageIsOnStorageItem = await imageIsOnStorage()
  if (!userAvatar.value || fileData.value) {
    if (!imageIsOnStorageItem) {
      await uploadAvatar()
    } else {
      await updateUserAvatar()
    }
  }

  const { data, error } = await supabase.storage.from('og').list()

  if (error) {
    throw error
  }
  const files = data.filter(file => file.name.slice(0, -4) === slug.value)

  await domtoimage.toPng(og.value).then(function (dataUrl) {
    const img = new Image()
    img.src = dataUrl
    // document.body.appendChild(img)
    ogName.value = `${savedItems.value?.username}.png`
    base64.value = img.src.split('base64,')[1]
  }).catch(function (error) {
    throw new Error(error)
  })

  await uploadOg(files, ogName.value, base64.value)
}

const updateUserAvatar = async () => {
  try {
    const { error } = await supabase.storage.from('profiles').update(fileNameToSend.value, fileData.value)

    if (error) {
      throw error
    }

    userAvatar.value = fileNameToSend.value
    filePath.value = fileNameToSend.value
  } catch (error) {
    console.log(error)
  }
}

const supabase = useSupabaseClient()

const uploadAvatar = async () => {
  try {
    const { error } = await supabase.storage.from('profiles').upload(fileNameToSend.value, fileData.value)

    if (error) {
      throw error
    }

    userAvatar.value = fileNameToSend.value
    filePath.value = fileNameToSend.value
  } catch (error) {
    add({
      message: 'Ocorreu um erro ao carregar os dados do usuário',
      type: 'error'
    })
  }
}

const user = useSupabaseUser()

const uploadUser = async (name, username, email, theme) => {
  const { data, error } = await supabase.from('profiles').update({
    name,
    username,
    email,
    theme,
    avatar_url: userAvatar.value,
    slug: slug.value
  }).eq('id', user.value?.id).select()

  if (data) {
    savedItems.value.name = Object.freeze(name)
    savedItems.value.username = Object.freeze(username)
    savedItems.value.email = Object.freeze(email)
    savedItems.value.theme = Object.freeze(theme)
    savedItems.value.avatar_url = Object.freeze(userAvatar.value)
  }
  if (error) {
    throw error
  }
}

const onSubmit = handleSubmit(async (values) => {
  try {
    saving.value = true
    if (!fileDisplay.value) {
      add({
        message: 'Selecione uma imagem para o perfil!',
        type: 'error'
      })
      return
    }
    await uploadUser(values.name, values.username, values.email, theme.value)
    if (!userAvatar.value || fileData.value) {
      await upProfileImage()
    }
    add({
      message: 'Perfil atualizado com sucesso',
      type: 'success'
    })
  } catch (error) {
    add({
      message: 'Ocorreu um erro ao atualizar o perfil',
      type: 'error'
    })
  } finally {
    saving.value = false
  }
})

const haveDifference = () => {
  return !(savedItems.value.name !== name.value ||
    savedItems.value.username !== username.value ||
    savedItems.value.email !== email.value ||
    savedItems.value.theme !== theme.value ||
    savedItems.value.avatar_url !== filePath.value)
}

const getUserData = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('name, username, email, theme, avatar_url, social_links').eq('id', user.value?.id)

    if (error) {
      throw error
    }

    if (data) {
      name.value = data[0].name
      username.value = data[0].username
      email.value = data[0].email
      theme.value = data[0].theme ?? 'light'
      userAvatar.value = data[0].avatar_url ?? ''
      socialLinks.value = data[0].social_links ?? []
      filePath.value = data[0].avatar_url ?? ''

      savedItems.value.name = Object.freeze(name.value)
      savedItems.value.username = Object.freeze(username.value)
      savedItems.value.email = Object.freeze(email.value)
      savedItems.value.theme = Object.freeze(theme.value)
      savedItems.value.avatar_url = Object.freeze(userAvatar.value)
    }
  } catch (error) {
    add({
      message: 'Ocorreu um erro ao carregar os dados do usuário',
      type: 'error'
    })
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
    add({
      message: 'Houve uma falha ao carregar a imagem do usuário',
      type: 'error'
    })
  }
}

onMounted(async () => {
  await getUserData()
  await downloadUserImage()
})

onBeforeUnmount(() => {
  URL.revokeObjectURL(fileDisplay.value)
})
</script>
