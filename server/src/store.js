import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    userId: null,
  }),
  actions: {
    setUserId(userId) {
      this.userId = userId;
    },
  },
});