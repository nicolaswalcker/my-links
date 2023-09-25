<template>
  <header class="flex w-full items-center justify-between">
    <div class="flex items-center gap-2">
      <Icon name="ri:link-m" />
      <strong>Link #{{ number }}</strong>
    </div>
    <button class="btn btn-ghost btn-sm" @click="$emit('delete:item')">
      Remove
    </button>
  </header>
</template>

<script setup>
defineEmits(['delete:item'])
defineProps({
  number: {
    type: Number,
    required: true
  }
})
</script>
