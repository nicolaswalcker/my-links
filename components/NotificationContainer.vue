<template>
  <TransitionGroup tag="div" name="fade" class="toast toast-end toast-top z-20">
    <NotificationComponent v-for="notification in notificationsOrdered" :key="notification.id" :notification="notification" />
  </TransitionGroup>
</template>

<script setup>
const notificationsStore = useNotification()
const { notifications } = toRefs(notificationsStore)

const notificationsOrdered = computed(() => {
  return notifications.value.sort((a, b) => {
    return a.id - b.id
  })
})
</script>
