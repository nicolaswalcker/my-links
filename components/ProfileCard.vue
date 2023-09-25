<template>
  <article
    class="flex h-full w-full flex-col items-center justify-between gap-3 rounded-md bg-base-100 p-6 md:max-h-[80%] md:max-w-[350px] md:justify-center"
    :data-theme="profile?.theme"
  >
    <div class="flex w-full flex-col items-center justify-center gap-1">
      <img v-if="profile?.avatar_url" :src="profile?.avatar_url" :alt="`Imagem de perfil de ${profile?.name}`" class="h-24 w-24 rounded-full object-cover">
      <SkeletonLoading v-else class="h-24 w-24" />
      <p v-if="profile?.name" class="w-4/5 truncate text-center font-semibold text-base-content">
        {{ profile?.name }}
      </p>
      <SkeletonLoading v-else class="h-6 w-4/5" />
      <p v-if="profile?.username" class="w-3/5 truncate text-center text-base-content/60">
        @{{ profile?.username }}
      </p>
      <SkeletonLoading v-else class="h-6 w-3/5" />
      <NuxtLink
        v-if="profile?.email"
        external
        :href="`mailto:${profile?.email}`"
        class="w-full truncate text-center text-base-content"
      >
        {{ profile?.email }}
      </NuxtLink>
      <SkeletonLoading v-else class="h-6 w-4/5" />
      <div class="mt-3 flex w-full flex-col items-center justify-center gap-4">
        <NuxtLink
          v-for="item in (profile?.social_links)"
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
const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
})

const socialsLength = computed(() => props.profile?.social_links.length ?? 0)
</script>
