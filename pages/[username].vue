<template>
  <section
    class="flex h-screen w-full items-center justify-center bg-base-200 md:py-10"
    :data-theme="profile?.theme"
  >
    <ProfileCard
      v-if="profile"
      :profile-avatar="fileDisplay"
      :profile-name="profile.name"
      :profile-username="profile.username"
      :profile-email="profile.email"
      :social-links="profile.social_links"
    />
  </section>
</template>

<script setup>
const route = useRoute()
const username = route.params.username
const fileDisplay = ref(null)
useSeoMeta({
  title: 'MyLinks - @' + username,
  description: 'Perfil do usuário @' + username,
  ogTitle: 'MyLinks - @' + username,
  ogDescription: 'Perfil do usuário @' + username,
  ogUrl: 'https://my-links-silk.vercel.app/' + username.toLowerCase(),
  ogImage: `https://ltztoakayexpmxqyspvz.supabase.co/storage/v1/object/public/og/${username}.png`,
  twitterImage: `https://ltztoakayexpmxqyspvz.supabase.co/storage/v1/object/public/og/${username}.png`,
  twitterTitle: 'MyLinks - @' + username,
  twitterDescription: 'Perfil do usuário @' + username,
  twitterCard: 'summary'
})
useHead({
  htmlAttrs: {
    lang: 'pt-BR'
  },
  link: [
    {
      rel: 'icon',
      href: '/favicon.ico'
    }
  ]
})
definePageMeta({
  layout: false
})

const { add } = useNotification()

const supabase = useSupabaseClient()
const profile = ref(null)

const getUser = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('slug', username)
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    add({
      message: 'Usuário não encontrado',
      type: 'error'
    })
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
      fileDisplay.value = url
    }
  } catch (error) {
    add({
      message: 'Erro ao carregar imagem',
      type: 'error'
    })
  }
}

onMounted(async () => {
  profile.value = await getUser()
  if (profile.value) {
    await downloadUserImage()
  }
})
</script>
