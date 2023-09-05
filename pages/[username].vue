<template>
  <section
    class="flex h-screen w-full items-center justify-center bg-base-200 md:py-10"
  >
    <article
      class="flex h-full w-full flex-col items-center justify-center gap-5 rounded-md bg-base-100 p-6 md:max-h-[70%] md:max-w-[350px]"
    >
      <div class="flex w-full flex-col items-center justify-center gap-1">
        <img
          class="h-[96px] w-[96px] rounded-full object-cover"
          src="https://images.pexels.com/photos/16233515/pexels-photo-16233515/free-photo-of-adobe-photoshop-adulto-atleta-esportista.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="#"
        >
        <p class="w-full truncate text-center font-semibold text-base-content">
          Nicolas Walcker
        </p>
        <p class="w-full truncate text-center text-base-content/60">
          @nicaomaneirao
        </p>
        <NuxtLink
          external
          href="#"
          class="w-full truncate text-center text-base-content"
        >
          nicaomaneirao@gmail.com
        </NuxtLink>
      </div>
      <div class="flex w-full flex-col items-center justify-center gap-4">
        <div
          v-for="(item, index) in 5"
          :key="index"
          class="h-12 min-w-[230px] rounded-sm bg-base-200"
        />
      </div>
    </article>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false
})

const route = useRoute()
const username = route.params.username

useSeoMeta({
  title: 'MyLinks - @' + username
})
</script>
