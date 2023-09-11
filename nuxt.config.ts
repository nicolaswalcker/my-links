// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    'nuxt-icon',
    '@pinia/nuxt'
  ],
  tailwindcss: {
    cssPath: '~/assets/css/global.css',
    configPath: 'tailwind.config'
  },
  imports: {
    dirs: ['./stores']
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
      mode: 'out-in'
    }
  },
  devtools: { enabled: true }
})
