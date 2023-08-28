<template>
  <div class="form-control w-full">
    <label class="label" for="#">Link</label>
    <input :value="modelValue" placeholder="https://github.com/username" type="text" class="input input-bordered" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
  </div>
</template>

<script lang="ts" setup>
defineEmits(['update:modelValue'])
defineProps<{
  modelValue: string
}>()
</script>

<style>

</style>
