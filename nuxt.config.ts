// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@vueuse/nuxt',
    'nuxt-icon'
  ],
  tailwindcss: {
    cssPath: '~/assets/css/global.css',
    configPath: 'tailwind.config'
  },
  eslint: {
    lintOnStart: false
  },
  app: {
    head: {
      htmlAttrs: {
        'data-theme': 'light'
      }
    }
  },
  devtools: { enabled: true }
})
