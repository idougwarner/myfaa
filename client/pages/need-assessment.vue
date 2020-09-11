<template>
  <div>
    <div class="myfaa-page-content">
      <div class="q-mb-md">
        <q-input
          label="Department Name"
          outlined
          dense
          v-model="name"
          @input="delayTouch($v.name, $options.touchMap)"
          :error="$v.name.$error"
        />
        <q-btn
          outline
          color="primary"
          label="Create"
          :loading="loading"
          @click="createDepartment"
        >
          <template #loading>
            <q-spinner-gears />
          </template>
        </q-btn>
      </div>
      <ApolloQuery :query="$options.graphql.queries.departments">
        <template #default="{ result: { loading, error, data } }">
          <div v-if="loading">Loading...</div>
          <div v-else-if="error">An error occurred</div>
          <div v-else-if="data" class="result apollo">
            {{ data }}
          </div>
          <div v-else class="no-result apollo">No result :(</div>
        </template>
      </ApolloQuery>
    </div>
  </div>
</template>

<script>
import graphql from '@client/graphql';
import { required } from 'vuelidate/lib/validators';
import delayTouch from '@client/utils/delayTouch';

export default {
  name: 'NeedAssessment',
  touchMap: new WeakMap(),
  graphql,
  validations: {
    name: { required }
  },
  data() {
    return {
      loading: false,
      name: ''
    };
  },
  methods: {
    async createDepartment() {
      this.loading = true;
      this.validate();
      try {
        this.$apollo.mutate({
          mutation: graphql.mutations.createDepartment,
          variables: {
            name: this.name
          },
          update: (store, { data: { createDepartment } }) => {
            const data = store.readQuery({
              query: graphql.queries.departments
            });
            data.departments.push(createDepartment);
            store.writeQuery({ query: graphql.queries.departments, data });
          }
        });
      } catch (error) {
        console.error(error);
      }
      this.loading = false;
    },
    validate() {
      if (this.$v.name.$invalid) {
        this.$v.name.$touch();
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        throw new Error('Name field is required');
      }
    },
    delayTouch
  }
};
</script>

<style></style>
