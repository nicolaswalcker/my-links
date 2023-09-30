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
definePageMeta({
  layout: false
})

const route = useRoute()
const username = route.params.username
const fileDisplay = ref(null)

const supabase = useSupabaseClient()
const profile = ref(null)

const getUser = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('slug', username)
    .single()

  if (error) {
    console.error(error)
  }

  return data
}

useSeoMeta({
  title: 'MyLinks - @' + username
})

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
    console.log(error)
  }
}

onMounted(async () => {
  profile.value = await getUser()
  await downloadUserImage()
})
</script>
