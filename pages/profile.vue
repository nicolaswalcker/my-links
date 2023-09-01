<template>
  <section
    class="flex h-auto min-h-[calc(100vh-88px)] w-full items-center justify-end gap-4 bg-base-200 p-4 transition-all"
  >
    <div class="relative hidden h-[700px] w-[40%] md:block">
      <div
        class="flex h-[700px] w-[calc(40%-16px)] items-center justify-center rounded-lg bg-base-100 p-6 md:fixed"
        :data-theme="user.theme"
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
              v-if="user.name"
              class="w-full truncate text-center font-semibold text-base-content"
            >
              {{ user.name }}
            </p>
            <div v-else class="h-6 w-24 rounded-full bg-base-300" />
            <p
              v-if="user.username"
              class="w-full truncate text-center text-base-content/60"
            >
              {{ user.username }}
            </p>
            <div v-else class="h-6 w-36 rounded-full bg-base-300" />
            <NuxtLink
              v-if="user.email"
              external
              :href="`mailto:${user.email}`"
              class="link-neutral w-full truncate text-center"
            >
              {{ user.email }}
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
      class="flex h-full min-h-[700px] w-full flex-col items-start justify-start gap-7 rounded-lg bg-base-100 p-6 md:w-[60%]"
    >
      <div class="flex flex-col items-start justify-start gap-3">
        <h1 class="text-4xl font-bold">
          Detalhes do perfil
        </h1>
        <p class="opacity-75">
          Deixe o seu perfil com sua cara e fale um pouco de você!
        </p>
      </div>
      <form class="flex w-full flex-col items-start justify-center gap-6">
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
                <small v-if="errorType" class="text-red-500">
                  {{ errorType }}
                </small>
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
            <div
              class="flex w-full flex-col items-start justify-between md:flex-row md:items-center"
            >
              <label class="label" for="name">Nome completo</label>
              <input
                id="name"
                v-model="user.name"
                required
                type="text"
                class="input input-bordered w-full md:w-[65%]"
              >
            </div>
            <div
              class="flex w-full flex-col items-start justify-between md:flex-row md:items-center"
            >
              <label class="label" for="username">Usuário</label>
              <input
                id="username"
                v-model="user.username"
                required
                type="text"
                class="input input-bordered w-full md:w-[65%]"
              >
            </div>
            <div
              class="flex w-full flex-col items-start justify-between md:flex-row md:items-center"
            >
              <label class="label" for="email">Email</label>
              <input
                id="email"
                v-model="user.email"
                required
                type="email"
                class="input input-bordered w-full md:w-[65%]"
              >
            </div>
            <div
              class="flex w-full flex-col items-start justify-between md:flex-row md:items-center"
            >
              <label class="label" for="theme">Tema</label>
              <select
                id="theme"
                v-model="user.theme"
                class="input input-bordered w-full capitalize md:w-[65%]"
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

<script lang="ts" setup>
// TODO: Validation
const themesList = ref<Array<string>>([
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

const user = ref({
  id: 1,
  name: '',
  username: '',
  email: '',
  theme: 'light'
})

const file = ref<any>(null)
const fileDisplay = ref<string>('')
const fileData = ref<File | null>()
const errorType = ref<string>('')

const onChange = (e: any) => {
  if (!e.target.files[0]) {
    return
  }
  fileDisplay.value = URL.createObjectURL(e.target.files[0])
  fileData.value = e.target.files[0]
}

const onDrop = (e: any) => {
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
}

const clearImage = () => {
  fileDisplay.value = ''
  fileData.value = null
  file.value = null
}
</script>
