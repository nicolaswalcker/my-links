<template>
  <section
    class="flex h-auto min-h-[calc(100vh-88px)] w-full items-start justify-end gap-4 bg-base-200 transition-all md:p-4"
  >
    <div class="relative hidden w-[40%] md:block">
      <div
        class="flex h-full max-h-[750px] w-[calc(40%-16px)] items-center justify-center rounded-lg bg-base-100 p-6 md:fixed"
      >
        <div class="absolute left-1/2 -translate-x-1/2">
          <ProfileCard
            :profile-name="profile?.name"
            :profile-email="profile?.email"
            :profile-username="profile?.username"
            :profile-avatar="profile?.avatar_url"
            :social-links="inputs"
            :profile-theme="profile?.theme"
          />
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

const profile = ref({
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
      profile.value = {
        ...data[0]
      }
      profile.value.social_links = inputs.value
    }

    await downloadUserImage()
  } catch (error) {
    console.log(error.message)
  }
}
const downloadUserImage = async () => {
  try {
    const { data, error } = await supabase.storage.from('profiles').download(profile.value.avatar_url)

    if (error) {
      throw error
    }

    if (data) {
      const url = URL.createObjectURL(data)
      profile.value.avatar_url = url
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
