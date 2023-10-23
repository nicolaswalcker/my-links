<template>
  <NuxtLayout>
    <NotificationContainer />
    <!-- <button @click="addNotification">
      Add notification
    </button> -->
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
// const { add } = useNotification()

// const addNotification = () => {
//   add({
//     message: 'This is a notification',
//     type: 'error'
//   })
// }
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
