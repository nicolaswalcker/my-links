import { defineStore, acceptHMRUpdate } from 'pinia'
import { Profile } from '~/utils/types/profile'

export const useProfile = defineStore('profile', () => {
  const profile = ref<Profile | null>()

  const profileExists = computed(() => profile.value !== null)

  const setProfile = (newProfile: Profile) => {
    profile.value = newProfile
  }

  const clearProfile = () => {
    profile.value = null
  }

  const getProfile = () => {
    return profile.value
  }

  return {
    profile,
    profileExists,
    setProfile,
    clearProfile,
    getProfile
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfile, import.meta.hot))
}
