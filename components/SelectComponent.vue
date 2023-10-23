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

<script setup>
const menu = ref(false)
const toggleMenu = () => {
  menu.value = !menu.value
}

const prop = defineProps({
  selected: {
    type: Object,
    default: () => ({
      icon: 'cib:facebook-f',
      name: 'facebook'
    })
  }
})

const selected = ref(prop.selected)

const emit = defineEmits(['update:selected'])
const socialList = ref([
  {
    icon: 'cib:facebook-f',
    name: 'facebook'
  },
  {
    icon: 'cib:twitter',
    name: 'twitter'
  },
  {
    icon: 'cib:instagram',
    name: 'instagram'
  },
  {
    icon: 'cib:linkedin-in',
    name: 'linkedin'
  },
  {
    icon: 'cib:github',
    name: 'github'
  },
  {
    icon: 'cib:youtube',
    name: 'youtube'
  },
  {
    icon: 'cib:twitch',
    name: 'twitch'
  },
  {
    icon: 'cib:tiktok',
    name: 'tiktok'
  },
  {
    icon: 'cib:spotify',
    name: 'spotify'
  },
  {
    icon: 'cib:pinterest-p',
    name: 'pinterest'
  },
  {
    icon: 'cib:behance',
    name: 'behance'
  },
  {
    icon: 'cib:dribbble',
    name: 'dribbble'
  },
  {
    icon: 'cib:medium-m',
    name: 'medium'
  },
  {
    icon: 'cib:reddit-alt',
    name: 'reddit'
  },
  {
    icon: 'cib:dev-to',
    name: 'dev'
  }
])

const getSocial = (name) => {
  return name.includes('-') ? name.split('-').join(' ') : name
}

const onSelect = (value) => {
  selected.value = value
  emit('update:selected', value)
  toggleMenu()
}
</script>
