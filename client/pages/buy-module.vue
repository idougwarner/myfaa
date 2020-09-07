<template>
  <div class="window-height myfaa-page-content">
    {{ onboardingModule ? onboardingModule.name : '' }}
    <stripe-card
      :create-intent-secret="handleCreateBuyModuleIntentSecret"
      @on-error="handleError"
      @on-success="handleSuccess"
    />
  </div>
</template>

<script>
import StripeCard from '@client/components/stripe-card';
import ONBOARDING_MODULE from '@client/graphql/OnboardingModule.gql';
import CREATE_BUY_MODULE_INTENT from '@client/graphql/CreateBuyModuleIntent.gql';
import DID_CONFIRM_BUY_MODULE_INTENT from '@client/graphql/DidConfirmBuyModuleIntent.gql';

export default {
  name: 'BuyModule',
  components: {
    StripeCard
  },
  data() {
    return {
      onboardingModule: null
    };
  },
  apollo: {
    onboardingModule: ONBOARDING_MODULE
  },
  methods: {
    async handleCreateBuyModuleIntentSecret() {
      const response = await this.$apollo.mutate({
        mutation: CREATE_BUY_MODULE_INTENT
      });
      return response.data.createBuyModuleIntent;
    },
    async handleSuccess(paymentIntentId) {
      try {
        await this.$apollo.mutate({
          mutation: DID_CONFIRM_BUY_MODULE_INTENT,
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
