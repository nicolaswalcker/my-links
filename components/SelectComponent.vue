<template>
  <div class="form-control w-full">
    <label
      id="listbox-label"
      class="label"
    >Plataforma</label>
    <div class="relative mt-2">
      <button
        type="button"
        class="input input-bordered w-full"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        @click="toggleMenu"
      >
        <span class="flex items-center">
          <Icon :name="selected.icon" />
          <span class="ml-3 block truncate first-letter:capitalize">{{ getSocial(selected.name) }}</span>
        </span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
        >
          <Icon class="transition-all" :class="menu ? 'rotate-180 text-primary' : ''" name="material-symbols:keyboard-arrow-down" size="24" />
        </span>
      </button>
      <ul
        v-if="menu"
        class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-base-100 py-1 text-base shadow-lg ring-1 ring-base-content/5 focus:outline-none sm:text-sm"
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-3"
      >
        <li
          v-for="(item, index) in socialList"
          :id="`listbox-option-${index}`"
          :key="index"
          class="relative cursor-pointer select-none py-2 pl-3 pr-9 text-base-content hover:text-primary"
          role="option"
          @click="onSelect(item)"
        >
          <div class="flex items-center">
            <Icon :name="item.icon" size="24" />
            <span class="ml-3 block truncate font-normal first-line:capitalize">{{ getSocial(item.name) }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Social } from '@/utils/types/social'
const menu = ref(false)
const toggleMenu = () => {
  menu.value = !menu.value
}

const prop = withDefaults(defineProps<{
  selected: Social
}>(), {
  selected: () => ({
    name: 'facebook',
    icon: 'cib:facebook-f'
  })
})

const selected = ref<Social>(prop.selected)

const emit = defineEmits(['update:selected'])

// todo: adds slug item on social object
const socialList = ref<Array<Social>>([
  {
    name: 'facebook',
    icon: 'cib:facebook-f'
  },
  {
    name: 'twitter',
    icon: 'cib:twitter'
  },
  {
    name: 'instagram',
    icon: 'cib:instagram'
  },
  {
    name: 'linkedin',
    icon: 'cib:linkedin-in'
  },
  {
    name: 'github',
    icon: 'cib:github'
  },
  {
    name: 'youtube',
    icon: 'cib:youtube'
  },
  {
    name: 'twitch',
    icon: 'cib:twitch'
  },
  {
    name: 'tiktok',
    icon: 'cib:tiktok'
  },
  {
    name: 'spotify',
    icon: 'cib:spotify'
  },
  {
    name: 'pinterest',
    icon: 'cib:pinterest-p'
  },
  {
    name: 'behance',
    icon: 'cib:behance'
  },
  {
    name: 'dribbble',
    icon: 'cib:dribbble'
  },
  {
    name: 'medium',
    icon: 'cib:medium-m'
  },
  {
    name: 'reddit',
    icon: 'cib:reddit-alt'
  },
  {
    name: 'dev',
    icon: 'cib:dev-to'
  }
])

const getSocial = (name: string) => {
  return name.includes('-') ? name.split('-').join(' ') : name
}

const onSelect = (value: Social) => {
  selected.value = value
  emit('update:selected', value)
  toggleMenu()
}
</script>
