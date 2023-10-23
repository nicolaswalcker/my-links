export const useNotification = defineStore('notification', () => {
  let id = 1
  const notifications = ref([])

  const add = (notification) => {
    notifications.value.push({
      ...notification,
      id: id++
    })
  }

  const remove = (notificationToRemove) => {
    notifications.value = notifications.value.filter(notification => notification.id !== notificationToRemove.id)
  }

  return {
    notifications,
    add,
    remove
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounter, import.meta.hot))
}
