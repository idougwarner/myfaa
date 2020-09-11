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
      <ApolloQuery :query="$options.graphql.queries.currentCompany">
        <template #default="{ result: { loading, error, data: companyGraph } }">
          <div v-if="loading">Loading...</div>
          <div v-else-if="error">An error occurred</div>
          <div v-else-if="companyGraph && companyGraph.currentCompany">
            <ApolloQuery :query="$options.graphql.queries.departments">
              <template
                #default="{ result: { loading, error, data: departmentGraph } }"
              >
                <div v-if="loading">Loading...</div>
                <div v-else-if="error">An error occurred</div>
                <div v-else-if="departmentGraph">
                  <assessment-table
                    :departments="departmentGraph.departments"
                    :modules="companyGraph.currentCompany.modules"
                    :assignCourse="assignCourse"
                  />
                </div>
                <div v-else>No result :(</div>
              </template>
            </ApolloQuery>
          </div>
          <div v-else>No result :(</div>
        </template>
      </ApolloQuery>
    </div>
  </div>
</template>

<script>
import graphql from '@client/graphql';
import { required } from 'vuelidate/lib/validators';
import delayTouch from '@client/utils/delayTouch';
import { AssessmentTable } from '@client/components/tables';
import {
  addItemToNestedArray,
  removeItemFromNestedArray,
  setNewValue
} from '@client/utils/object-helpers';

export default {
  name: 'NeedAssessment',
  components: {
    AssessmentTable
  },
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
    assignCourse(department, course, assign) {
      return this.$apollo.mutate({
        mutation: graphql.mutations.assignCourseToDepartment,
        variables: {
          departmentId: department.id,
          courseId: course.id,
          assign
        },
        update: (store) => {
          const data = store.readQuery({
            query: graphql.queries.departments
          });
          store.writeQuery({
            query: graphql.queries.departments,
            data: setNewValue(
              data,
              'departments',
              data.departments.map((d) => {
                if (d.id !== department.id) return d;
                if (assign) {
                  return addItemToNestedArray(d, 'courses', course);
                }
                return removeItemFromNestedArray(d, 'courses', course);
              })
            )
          });
        }
      });
    },
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
