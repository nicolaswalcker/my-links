<template>
  <article class="alert flex w-full justify-between" :class="notificationClass">
    <div class="flex h-full w-full items-center justify-start gap-4">
      <Icon class="!hidden sm:!block" :name="notificationIcon" size="24" />
      <span class="whitespace-break-spaces text-lg font-semibold">{{ notification.message }}</span>
    </div>
    <button @click="remove(notification)">
      <Icon name="ic:baseline-close" size="24" />
    </button>
  </article>
</template>

<script setup>
const props = defineProps({
  notification: {
    type: Object,
    required: true
  }
})

const { remove } = useNotification()

onMounted(() => {
  setTimeout(() => {
    remove(props.notification)
  }, 4000)
})

const notificationClass = computed(() => {
  return {
    error: 'alert-error',
    success: 'alert-success'
  }[props.notification.type]
})

const notificationIcon = computed(() => {
  return {
    error: 'material-symbols:error-circle-rounded',
    success: 'material-symbols:check-circle-rounded'
  }[props.notification.type]
})
</script>
