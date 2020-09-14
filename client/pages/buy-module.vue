<template>
  <div class="window-height myfaa-page-content">
    {{ onboardingModule ? onboardingModule.name : '' }}
    <q-input outlined dense v-model="couponCode" debounce="250" />
    <q-input outlined dense v-model.number="moduleCount" type="number" />
    <stripe-card
      :create-intent-secret="handleCreateBuyModuleIntentSecret"
      @on-error="handleError"
      @on-success="handleSuccess"
    />
  </div>
</template>

<script>
import StripeCard from '@client/components/stripe-card';
import graphql from '@client/graphql';

export default {
  name: 'BuyModule',
  components: {
    StripeCard
  },
  data() {
    return {
      onboardingModule: null,
      couponCode: null,
      coupon: null,
      moduleCount: 1
    };
  },
  apollo: {
    onboardingModule: graphql.queries.onboardingModule,
    coupon: {
      query: graphql.queries.couponByCode,
      variables() {
        return {
          code: this.couponCode
        };
      },
      skip() {
        return !this.couponCode;
      }
    }
  },
  methods: {
    async handleCreateBuyModuleIntentSecret() {
      const response = await this.$apollo.mutate({
        mutation: graphql.mutations.createBuyModuleIntent,
        variables: {
          moduleId: this.onboardingModule.id,
          moduleCount: this.moduleCount,
          couponId: this.coupon ? this.coupon.id : ''
        }
      });
      return response.data.createBuyModuleIntent;
    },
    async handleSuccess(paymentIntentId) {
      try {
        await this.$apollo.mutate({
          mutation: graphql.mutations.didConfirmBuyModuleIntent,
          variables: { paymentIntentId }
        });
        this.$router.push({ name: 'home' });
      } catch (error) {
        this.notifyNegative(error.message);
      }
    },
    handleError(errorMessage) {
      console.log('error', errorMessage);
    }
  }
};
</script>
