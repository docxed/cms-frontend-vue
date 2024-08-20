import { defineStore } from 'pinia'
import { v4 } from 'uuid'

export const useNotifyStore = defineStore('notifyStore', {
  state: () => ({
    notifications: [],
  }),
  actions: {
    send(type, message, timeout = 5000) {
      const id = v4()
      this.notifications.push({ id, type, message })
      setTimeout(() => {
        this.remove(id)
      }, timeout)
    },
    remove(id) {
      this.notifications = this.notifications.filter((n) => n.id !== id)
    },
    success(message, timeout = 5000) {
      this.send('success', message, timeout)
    },
    error(message, timeout = 5000) {
      this.send('error', message, timeout)
    },
    warning(message, timeout = 5000) {
      this.send('warning', message, timeout)
    },
    info(message, timeout = 5000) {
      this.send('info', message, timeout)
    },
  },
})
