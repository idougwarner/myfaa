<template>
  <q-form @submit.prevent>
    <div ref="card"></div>
    <q-btn
      label="Pay"
      type="submit"
      outline
      :loading="loading"
      @click.prevent="handlePay"
    >
      <template #loading>
        <q-spinner-gears />
      </template>
    </q-btn>
  </q-form>
</template>

<script>
import loadScript from '@client/utils/load-script';

let stripe;
let card;

export default {
  name: 'StripeCard',
  props: ['createIntentSecret'],
  data() {
    return {
      loading: false
    };
  },
  async mounted() {
    await loadScript('https://js.stripe.com/v3/', 'StripeSDK');
    stripe = window.Stripe(window.STRIPE_PUBLISHABLE_KEY);
    card = stripe.elements().create('card');
    card.mount(this.$refs.card);
  },
  methods: {
    async handlePay(e) {
      e.preventDefault();
      this.loading = true;

      const secret = await this.createIntentSecret();
      try {
        const result = await stripe.confirmCardPayment(secret, {
          payment_method: {
            card
          }
        });

        if (result.error) {
          this.$emit('on-error', result.error.message);
        } else if (result.paymentIntent.status === 'succeeded') {
          this.$emit('on-success', result.paymentIntent.id);
        }
      } catch (error) {
        this.$emit('on-error', error.message);
      }
      this.loading = false;
    }
  }
};
</script>

<style></style>
