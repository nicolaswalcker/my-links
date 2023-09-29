<template>
  <section
    class="flex h-[calc(100vh-88px)] w-full items-center justify-center bg-base-200 md:py-10"
    :data-theme="profile?.theme"
  >
    <ProfileCard :profile-name="profile?.name" :profile-email="profile?.email" :profile-username="profile?.username" :profile-avatar="profile?.avatar_url" :social-links="profile?.social_links" />
  </section>
</template>

<script setup>

definePageMeta({
  middleware: 'auth'
})

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const profile = ref()

const getUserData = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', user.value?.id)

    if (error) {
      throw error
    }

    if (data) {
      return data[0]
    }
  } catch (error) {
    console.log(error)
  }
}

const downloadUserImage = async (avatarUrl) => {
  try {
    const { data, error } = await supabase.storage.from('profiles').download(avatarUrl)

    if (error) {
      throw error
    }

    if (data) {
      const url = URL.createObjectURL(data)
      return url
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(async () => {
  profile.value = await getUserData()

  if (profile.value) {
    const imageUrl = await downloadUserImage(profile.value.avatar_url)
    profile.value.avatar_url = imageUrl
  }
})
</script>
