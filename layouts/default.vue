<template>
  <header class="flex h-auto flex-wrap items-center justify-around gap-2 bg-base-100 p-5">
    <div class="btn btn-outline" :class="smallerThanSm ? 'btn-square' : ''">
      <Icon name="simple-icons:hyperledger" size="24" />
      <p class="hidden sm:block">
        My Links
      </p>
    </div>

    <nav>
      <ul class="flex items-center gap-3">
        <li>
          <nuxt-link :class="smallerThanSm ? 'btn-square' : ''" class="btn" active-class="btn-neutral" to="/links">
            <Icon name="solar:link-circle-bold" size="24" />
            <p class="hidden sm:block">
              Links
            </p>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :class="smallerThanSm ? 'btn-square' : ''" class="btn" active-class="btn-neutral" to="/profile">
            <Icon name="solar:user-circle-bold" size="24" />
            <p class="hidden sm:block">
              Perfil
            </p>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :class="smallerThanSm ? 'btn-square' : ''" class="btn" active-class="btn-neutral" to="/">
            <Icon name="solar:gallery-bold" size="24" />
            <p class="hidden sm:block">
              Preview
            </p>
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <button :class="smallerThanSm ? 'btn-square' : ''" class="btn btn-outline">
      <Icon name="solar:logout-3-bold" size="18" />
      <p class="hidden sm:block">
        Sair
      </p>
    </button>
  </header>

  <main class="h-auto min-h-[calc(100vh-88px)] w-full">
    <slot />
  </main>
</template>

<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core'
const breakpoints = useBreakpoints(breakpointsTailwind)

const smallerThanSm = breakpoints.smaller('sm')
</script>
