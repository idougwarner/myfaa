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
    },

    validate(fields) {
      let validationFailure = false;

      fields.forEach((field) => {
        if (this.$v[field].$invalid) {
          this.$v[field].$touch();
          validationFailure = true;
        }
      });

      if (validationFailure) {
        this.notifyNegative('Form has some invalid fields');
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        throw new Error('Invalid form');
      }
    }
  }
};
