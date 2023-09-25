<template>
  <div :class="{'md:flex-row md:items-center': isRow}">
    <label :for="name">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :name="name"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <slot />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  isRow: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>
