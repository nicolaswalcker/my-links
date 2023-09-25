<template>
  <section
    class="flex h-auto min-h-[calc(100vh-88px)] w-full items-start justify-end gap-4 bg-base-200 transition-all md:p-4"
  >
    <div class="relative hidden w-[40%] md:block">
      <div
        class="flex h-full max-h-[750px] w-[calc(40%-16px)] items-center justify-center rounded-lg bg-base-100 p-6 md:fixed"
      >
        <img
          class="absolute left-1/2 -translate-x-1/2"
          src="@/assets/images/illustration-phone-mockup.svg"
          alt="Ilustração de telefone"
        >
        <div
          class="z-10 flex h-full w-full flex-col items-center justify-center gap-8"
        >
          <div class="flex flex-col items-center justify-center gap-1">
            <div class="h-28 w-28 rounded-full bg-base-300" />
            <img src="" alt="">
            <div class="h-6 w-24 rounded-full bg-base-300" />
            <div class="h-6 w-36 rounded-full bg-base-300" />
            <div class="h-6 w-36 rounded-full bg-base-300" />
          </div>
          <div class="flex w-full flex-col items-center justify-center gap-4">
            <a
              v-for="item in inputs"
              :key="item.id"
              class="z-20 flex h-12 min-w-[230px] cursor-pointer items-center justify-center gap-3 rounded-lg border border-base-content bg-base-100 transition-colors hover:border-primary hover:bg-primary hover:text-base-100"
              :href="item.link"
              target="_blank"
            >
              <Icon :name="item.platform.icon" size="24" />
              <p class="first-letter:capitalize">
                {{ item.platform.name }}
              </p>
            </a>
            <div
              v-for="(item, index) in 5 - inputs.length"
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
          Customize seus links
        </h1>
        <p class="opacity-75">
          Adicione, atualize, remova e mostre para o mundo os seus links!
        </p>
      </div>
      <button
        :disabled="inputs.length >= 5"
        class="btn btn-outline btn-block"
        @click="addInput"
      >
        <Icon name="solar:add-square-bold" size="24" />
        Adicionar novo link
      </button>
      <div
        v-if="!inputs.length"
        class="flex w-full flex-col items-center justify-center gap-5"
      >
        <img src="@/assets/images/empty.svg" class="max-w-sm" alt="">
        <p class="max-w-sm text-center">
          Ops... Parece que você não tem nenhum link cadastrado. Clique no botão
          de <Icon name="solar:add-square-bold" size="24" /> para adicionar um
          novo link.
        </p>
      </div>
      <div v-else class="flex w-full flex-col items-start justify-start gap-4">
        <div
          v-for="(item, index) in inputs"
          :key="item.id"
          class="flex w-full flex-col items-start justify-start rounded-lg bg-base-200 px-3 py-6"
        >
          <item-header
            :number="index + 1"
            @delete:item="removeInput(item.id)"
          />
          <main class="flex w-full flex-col items-start justify-start">
            <select-component
              :selected="item.platform"
              @update:selected="changePlatform(item.id, $event)"
            />
            <InputItem v-model="item.link" label="Link" placeholder="Insira a plataforma" :name="`input-${index + 1}`" />
            <ErrorItem v-if="!verifyUrl(item.link)" error="O URL da plataforma deve ser válido" />
          </main>
        </div>
      </div>

      <button :disabled="!verifyAllUrls" class="btn btn-primary self-end" @click="savePlatforms">
        <Icon v-if="saving" name="svg-spinners:8-dots-rotate" size="24" />
        <span v-else>Salvar</span>
      </button>
    </div>
  </section>
</template>

<script setup>
useHead({
  title: 'Links',
  meta: [
    {
      name: 'description',
      content: 'Customize seus links'
    }
  ]
})
definePageMeta({
  middleware: 'auth'
})

const verifyUrl = (url) => {
  try {
    // eslint-disable-next-line no-new
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

const verifyAllUrls = computed(() => {
  const urls = inputs.value.map(item => item.link)
  const allUrls = urls.every(item => verifyUrl(item))
  return allUrls
})

const inputs = ref([])
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const myUser = ({
  avatar_url: '',
  email: '',
  id: '',
  name: '',
  social_links: [],
  theme: '',
  username: '',
  created_at: ''
})

const saving = ref(false)

const addInput = () => {
  inputs.value.push({
    id: Math.floor(Math.random() * 10000),
    platform: {
      name: 'facebook',
      icon: 'cib:facebook-f'
    },
    link: ''
  })
}

const changePlatform = (
  id,
  value
) => {
  inputs.value = inputs.value.map((item) => {
    if (item.id === id) {
      item.platform = value
    }
    return item
  })
}

onMounted(async () => {
  await getPlatforms()
})

const removeInput = (id) => {
  inputs.value = inputs.value.filter(item => item.id !== id)
}

const savePlatforms = async () => {
  try {
    saving.value = true
    const { data, error } = await supabase
      .from('profiles')
      .update({
        social_links: inputs.value
      })
      .eq('id', user.value?.id).select('social_links')

    if (data) {
      inputs.value = data[0].social_links
    }

    if (error) { throw error }
  } catch (error) {
    throw error.message
  } finally {
    saving.value = false
  }
}

const getPlatforms = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('social_links, username, avatar_url, theme, email, name')
      .eq('id', user.value?.id)

    if (error) { throw error }
    if (data) {
      inputs.value = data[0].social_links
      myUser.value.social_links = data[0].social_links
      myUser.value.avatar_url = data[0].avatar_url
      myUser.value.email = data[0].email
      myUser.value.name = data[0].name
      myUser.value.username = data[0].username
      myUser.value.theme = data[0].theme
    }

    await downloadUserImage()
  } catch (error) {
    console.log(error.message)
  }
}
const downloadUserImage = async () => {
  try {
    const { data, error } = await supabase.storage.from('profiles').download(myUser.value.avatar_url)

    if (error) {
      throw error
    }

    if (data) {
      const url = URL.createObjectURL(data)
      myUser.value.avatar_url = url
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
