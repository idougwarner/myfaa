export default {
  methods: {
    notifyPositive(message) {
      this.$q.notify({
        type: 'positive',
        message
      });
    },

    notifyNegative(message) {
      this.$q.notify({
        type: 'negative',
        message
      });
    },

    notifyWarning(message) {
      this.$q.notify({
        type: 'warning',
        message
      });
    },

    notifyInfo(message) {
      this.$q.notify({
        type: 'info',
        message
      });
    }
  }
};
