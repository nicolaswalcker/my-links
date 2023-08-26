// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@vueuse/nuxt'
  ],
  app: {
    head: {
      htmlAttrs: {
        'data-theme': 'dark'
      }
    }
  },
  devtools: { enabled: true }
})
