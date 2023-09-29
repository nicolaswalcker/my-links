// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    'nuxt-icon'
  ],
  tailwindcss: {
    cssPath: '~/assets/css/global.css',
    configPath: 'tailwind.config'
  },
  supabase: {
    redirect: false
  },
  eslint: {
    lintOnStart: false
  },
  app: {
    head: {
      htmlAttrs: {
        'data-theme': 'light'
      }
    },
    pageTransition: {
      name: 'page',
      mode: 'in-out'
    }
  },
  devtools: { enabled: true }
})
