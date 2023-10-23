<template>
  <article
    class="relative flex h-full w-full flex-col items-center justify-between gap-3 rounded-md bg-base-100 p-6 md:max-h-[80%] md:max-w-[350px] md:justify-center"
    :data-theme="profileTheme"
  >
    <button v-if="profileUsername" :disabled="copied" class="absolute right-2 top-2 text-secondary-content" @click="copyLink(generateProfileLink())">
      <Icon v-if="copied" name="material-symbols:check-circle-outline-rounded" size="24" />
      <Icon v-else name="material-symbols:content-copy-outline-rounded" size="24" />
    </button>
    <div class="flex w-full flex-col items-center justify-center gap-1">
      <img v-if="profileAvatar" :src="profileAvatar" :alt="`Imagem de perfil de ${profileName}`" class="h-24 w-24 rounded-full object-cover">
      <SkeletonLoading v-else class="h-24 w-24" />
      <p v-if="profileName" class="w-4/5 truncate text-center font-semibold text-base-content">
        {{ profileName }}
      </p>
      <SkeletonLoading v-else class="h-6 w-4/5" />
      <p v-if="profileUsername" class="w-3/5 truncate text-center text-base-content/60">
        @{{ profileUsername }}
      </p>
      <SkeletonLoading v-else class="h-6 w-3/5" />
      <NuxtLink
        v-if="profileEmail"
        external
        :href="`mailto:${profileEmail}`"
        class="w-full truncate text-center text-base-content"
      >
        {{ profileEmail }}
      </NuxtLink>
      <SkeletonLoading v-else class="h-6 w-4/5" />
      <div class="mt-3 flex w-full flex-col items-center justify-center gap-4">
        <NuxtLink
          v-for="item in (socialLinks)"
          :key="item?.id"
          class="btn btn-wide z-20"
          :href="item?.link"
          target="_blank"
          external
        >
          <Icon :name="item?.platform.icon" size="24" />
          <p class="first-letter:capitalize">
            {{ item?.platform.name }}
          </p>
        </NuxtLink>
        <div
          v-for="(item, index) in 5 - socialsLength"
          :key="index"
          class="btn btn-disabled btn-wide"
        />
      </div>
    </div>
  </article>
</template>

<script setup>
const { copy, copied } = useClipboard()
const { add } = useNotification()
const generateProfileLink = () => {
  return `${window.location.origin}/${props.profileUsername.toLowerCase() ?? ''}`
}

const copyLink = (link) => {
  copy(link)
  add({
    message: 'Link copiado!',
    type: 'success'
  })
}

const props = defineProps({
  socialLinks: {
    type: Array,
    default: () => []
  },
  profileAvatar: {
    type: String,
    default: ''
  },
  profileName: {
    type: String,
    default: ''
  },
  profileUsername: {
    type: String,
    default: ''
  },
  profileEmail: {
    type: String,
    default: ''
  },
  profileTheme: {
    type: String,
    default: ''
  }
})

const socialsLength = computed(() => props.socialLinks.length ?? 0)
</script>
