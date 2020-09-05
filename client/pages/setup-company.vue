<template>
  <div class="window-height myfaa-page-content">
    <form>
      <h4 class="text-center">Company Information</h4>
      <div class="row q-col-gutter-sm">
        <q-input
          class="offset-1 col-5"
          label="Company Name"
          outlined
          dense
          v-model="name"
          @input="delayTouch($v.name, $options.touchMap)"
          :error="$v.name.$error"
        />
        <q-input
          class="col-5"
          label="Street Address"
          outlined
          dense
          v-model="street"
          @input="delayTouch($v.street, $options.touchMap)"
          :error="$v.street.$error"
        />
        <q-input
          class="offset-1 col-5"
          label="City"
          outlined
          dense
          v-model="city"
          @input="delayTouch($v.city, $options.touchMap)"
          :error="$v.city.$error"
        />
        <q-input
          class="col-5"
          label="State"
          outlined
          dense
          v-model="state"
          @input="delayTouch($v.state, $options.touchMap)"
          :error="$v.state.$error"
        />
        <q-input
          class="offset-1 col-5"
          label="Zip Code"
          outlined
          dense
          v-model="zipcode"
          @input="delayTouch($v.zipcode, $options.touchMap)"
          :error="$v.zipcode.$error"
        />
        <q-input
          class="col-5"
          label="Country"
          outlined
          dense
          v-model="country"
          @input="delayTouch($v.country, $options.touchMap)"
          :error="$v.country.$error"
        />
      </div>
      <div class="row">
        <q-btn
          class="q-mt-md offset-11"
          outline
          color="primary"
          label="Next"
          :loading="loading"
          @click="submit"
        >
          <template #loading>
            <q-spinner-gears />
          </template>
        </q-btn>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import delayTouch from '@client/utils/delayTouch';
import CREATE_COMPANY from '@client/graphql/CreateCompany.gql';
import ONBOARDING_STEPS from '@server/constants/onboarding-steps';

export default {
  name: 'CompanySetup',
  touchMap: new WeakMap(),
  validations: {
    name: { required },
    street: { required },
    city: { required },
    state: { required },
    zipcode: { required },
    country: { required }
  },
  data() {
    return {
      loading: false,
      name: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
      country: ''
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      this.validate();
      const { name, street, city, state, zipcode, country } = this;
      const campanyInput = { name, street, city, state, zipcode, country };
      try {
        const response = await this.$apollo.mutate({
          mutation: CREATE_COMPANY,
          variables: { input: campanyInput }
        });
        console.log('response', response);
        this.$router.push({ name: ONBOARDING_STEPS.BUY_MODULE });
      } catch (error) {
        console.log('setup company error', error);
        this.notifyNegative('Something went wrong. Please try again later');
      }
      this.loading = false;
    },
    validate() {
      let validationFailure = false;
      const fields = ['name', 'street', 'city', 'state', 'zipcode', 'country'];

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
    },
    delayTouch
  }
};
</script>
