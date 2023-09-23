<template>
  <section
    class="flex h-[calc(100vh-88px)] w-full items-center justify-center bg-base-200 md:py-10"
    :data-theme="profile?.theme"
  >
    <ProfileCard :profile="profile" />
  </section>
</template>

<script lang="ts" setup>
import { Profile } from '~/utils/types/profile'

definePageMeta({
  middleware: 'auth'
})

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const profile = ref<Profile>()

const getUserData = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', user.value?.id as string)

    if (error) {
      throw error
    }

    if (data) {
      return data[0] as Profile
    }
  } catch (error: any) {
    console.log(error)
  }
}

const downloadUserImage = async (avatarUrl: string) => {
  try {
    const { data, error } = await supabase.storage.from('profiles').download(avatarUrl)

    if (error) {
      throw error
    }

    if (data) {
      const url = URL.createObjectURL(data)
      return url
    }
  } catch (error: any) {
    console.log(error)
  }
}
onMounted(async () => {
  profile.value = await getUserData()

  if (profile.value) {
    const imageUrl = await downloadUserImage(profile.value.avatar_url as string)
    profile.value.avatar_url = imageUrl as string
  }
})
</script>
