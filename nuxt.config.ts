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
  app: {
    head: {
      htmlAttrs: {
        'data-theme': 'cupcake'
      }
    }
  },
  devtools: { enabled: true }
})
