<template>
  <span v-if="error" class="text-sm font-medium text-error">
    {{ error }}
  </span>
</template>

<script setup>
defineProps({
  error: {
    type: String,
    default: ''
  }
})
</script>
