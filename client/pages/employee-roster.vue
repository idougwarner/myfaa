<template>
  <div class="myfaa-page-content">
    <q-btn
      outline
      color="primary"
      class="q-mb-md"
      label="Invite as an employee"
      @click="handleInvite"
    />
    <ApolloQuery :query="$options.graphql.queries.companyEmployees">
      <template #default="{ result: { loading, error, data: employeeGraph } }">
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">An error occurred</div>
        <div v-else-if="employeeGraph && employeeGraph.employees">
          <employee-table :employees="employeeGraph.employees" />
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import { EmployeeTable } from '@client/components/tables';
import graphql from '@client/graphql';

export default {
  name: 'EmployeeRoster',
  graphql,
  components: {
    EmployeeTable
  },
  methods: {
    handleInvite() {}
  }
};
</script>

<style></style>
