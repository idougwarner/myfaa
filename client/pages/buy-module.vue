<template>
  <div class="window-height myfaa-page-content">
    <stripe-card
      :create-intent-secret="handleCreatePaymentIntentSecret"
      @on-error="handleError"
      @on-success="handleSuccess"
    />
  </div>
</template>

<script>
import StripeCard from '@client/components/stripe-card';
import CREATE_PAYMENT_INTENT from '@client/graphql/CreatePaymentIntent.gql';
import DID_ACCEPT_PAYMENT from '@client/graphql/DidAcceptPayment.gql';

export default {
  name: 'BuyModule',
  components: {
    StripeCard
  },
  methods: {
    async handleCreatePaymentIntentSecret() {
      const response = await this.$apollo.mutate({
        mutation: CREATE_PAYMENT_INTENT
      });
      return response.data.createPaymentIntent;
    },
    async handleSuccess(paymentIntentId) {
      try {
        await this.$apollo.mutate({
          mutation: DID_ACCEPT_PAYMENT,
          variables: { paymentIntentId }
        });
        this.$router.push({ name: 'home' });
      } catch (error) {
        console.log('error', error.message);
      }
    },
    handleError(errorMessage) {
      console.log('error', errorMessage);
    }
  }
};
</script>
