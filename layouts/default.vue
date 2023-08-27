<template>
  <header class="h-auto bg-base-100 flex justify-around items-center p-5 flex-wrap gap-2">
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
  <main class="h-screen w-full">
    <slot />
  </main>
</template>

<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core'
const breakpoints = useBreakpoints(breakpointsTailwind)

const smallerThanSm = breakpoints.smaller('sm')
</script>
