<template>
  <span v-if="error" class="text-sm font-medium text-error">
    {{ error }}
  </span>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  error: string
}>(), {
  error: ''
})
</script>
