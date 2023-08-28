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
          <Icon :name="`ri:${selected}-fill`" />
          <span class="ml-3 block truncate first-letter:capitalize">{{ selected }}</span>
        </span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
        >
          <Icon class="transition-all" :class="menu ? 'rotate-180 text-primary' : ''" name="material-symbols:keyboard-arrow-down" size="24" />
        </span>
      </button>
      <ul
        v-if="menu"
        class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-base-100 py-1 text-base shadow-lg ring-1 ring-base-content ring-opacity-5 focus:outline-none sm:text-sm"
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-3"
      >
        <li
          id="listbox-option-0"
          class="text-base-content relative cursor-pointer select-none py-2 pl-3 pr-9 hover:text-primary"
          role="option"
          @click="onSelect('facebook')"
        >
          <div class="flex items-center">
            <Icon name="ri:facebook-fill" size="24" />
            <span class="font-normal ml-3 block truncate">Facebook</span>
          </div>
        </li>
        <li
          id="listbox-option-0"
          class="text-base-content relative cursor-pointer select-none py-2 pl-3 pr-9 hover:text-primary"
          role="option"
          @click="onSelect('twitter')"
        >
          <div class="flex items-center">
            <Icon name="ri:twitter-fill" size="24" />
            <span class="font-normal ml-3 block truncate">Twitter</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
const menu = ref(false)
const toggleMenu = () => {
  menu.value = !menu.value
}

const prop = defineProps({
  selected: {
    type: String,
    default: 'Facebook'
  }
})

const selected = ref(prop.selected)

const emit = defineEmits(['update:selected'])

const onSelect = (value: string) => {
  selected.value = value
  emit('update:selected', value)
  toggleMenu()
}
</script>

<style></style>
