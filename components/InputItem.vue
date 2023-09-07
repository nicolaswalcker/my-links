<template>
  <div class="form-control w-full justify-between gap-1" :class="isRow ? 'md:flex-row md:items-center' : ''">
    <label class="label" :for="name">{{ label }}</label>
    <input
      :id="name"
      :name="name"
      :placeholder="placeholder"
      :type="type"
      class="input input-bordered input-ghost"
      :class="isRow ? 'w-full md:w-[65%]' : ''"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
    <slot />
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  label: string,
  type?: 'password' | 'email' | 'text',
  modelValue: string,
  placeholder: string,
  name: string,
  isRow?: boolean,
}>(), {
  type: 'text',
  isRow: false,
  modelValue: ''
})

defineEmits(['update:modelValue'])
</script>
