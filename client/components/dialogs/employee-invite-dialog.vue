<template>
  <base-dialog v-model="dialogOpen" full-width>
    <template #header>
      Invite employee
    </template>
    <template>
      <ApolloQuery :query="$options.graphql.queries.departments" :tag="null">
        <template
          #default="{ result: { loading, error, data: departmentGraph } }"
        >
          <div v-if="loading">Loading...</div>
          <div v-else-if="error">An error occurred</div>
          <div v-else-if="departmentGraph" class="row items-start">
            <form class="col-5 row q-col-gutter-sm items-center q-pa-sm">
              <q-input
                class="col-6"
                label="Email"
                outlined
                dense
                v-model="email"
                type="email"
                @input="delayTouch($v.email, $options.touchMap)"
                :error="$v.email.$error"
              />
              <q-input
                class="col-6"
                label="Supervisor Email"
                outlined
                dense
                v-model="supervisorEmail"
                type="email"
                @input="delayTouch($v.supervisorEmail, $options.touchMap)"
                :error="$v.supervisorEmail.$error"
              />
              <q-input
                class="col-6"
                label="Title"
                outlined
                dense
                v-model="title"
                @input="delayTouch($v.title, $options.touchMap)"
                :error="$v.title.$error"
              />
              <q-select
                class="col-6"
                outlined
                label="Department"
                dense
                v-model="departmentId"
                @input="
                  delayTouch($v.departmentId, $options.touchMap);
                  handleChangeDepartment(departmentGraph.departments, $event);
                "
                :loading="loading"
                :options="departmentGraph.departments"
                option-label="name"
                option-value="id"
                map-options
                emit-value
                :error="error || $v.departmentId.$error"
              />
              <q-checkbox
                class="col-6"
                v-model="safetySensitive"
                label="Safety Sensitive (CFR 121, 135, 145 Only)"
                dense
              />
              <q-checkbox
                class="col-6"
                v-model="admin"
                label="Administrator"
                dense
              />
            </form>
            <div class="col-7 q-pa-sm">
              <ApolloQuery
                :query="$options.graphql.queries.currentCompany"
                :tag="null"
              >
                <template
                  #default="{ result: { loading, error, data: companyGraph } }"
                >
                  <div v-if="loading">Loading...</div>
                  <div v-else-if="error">An error occurred</div>
                  <q-scroll-area
                    v-else-if="companyGraph && companyGraph.currentCompany"
                    style="height: 310px;"
                  >
                    <q-list bordered dense>
                      <q-item-label header>Courses</q-item-label>
                      <q-item
                        tag="label"
                        v-ripple
                        v-for="course in getCoursesFromModules(
                          companyGraph.currentCompany.modules
                        )"
                        :key="course.id"
                      >
                        <q-item-section side top>
                          <q-checkbox
                            :value="selectedCourses.includes(course.id)"
                            @input="handleSelectCourse(course, $event)"
                          />
                        </q-item-section>

                        <q-item-section>
                          <q-item-label>{{ course.name }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-scroll-area>
                </template>
              </ApolloQuery>
            </div>
          </div>
          <div v-else>
            You must create at least a department before inviting an employee
          </div>
        </template>
      </ApolloQuery>
    </template>
    <template #actions>
      <div class="row justify-end q-gutter-x-sm">
        <q-btn outline color="primary" label="Invite" @click="handleInvite" />
        <q-btn outline label="Close" @click="dialogOpen = false" />
      </div>
    </template>
  </base-dialog>
</template>

<script>
import flatten from 'lodash/flatten';
import { required, email } from 'vuelidate/lib/validators';
import delayTouch from '@client/utils/delayTouch';
// import { extractKeysIntoObject } from '@client/utils/object-helpers';
import graphql from '@client/graphql';
import BaseDialog from './base-dialog';

export default {
  name: 'EmployeeInviteDialog',
  graphql,
  touchMap: new WeakMap(),
  components: {
    BaseDialog
  },
  validations: {
    email: { required, email },
    supervisorEmail: { required, email },
    title: { required },
    departmentId: { required }
  },
  data() {
    return {
      loading: false,
      dialogOpen: false,
      email: '',
      supervisorEmail: '',
      title: '',
      departmentId: null,
      safetySensitive: false,
      admin: false,
      selectedCourses: []
    };
  },
  methods: {
    open() {
      this.dialogOpen = true;
    },
    handleChangeDepartment(departments, departmentId) {
      const department = departments.find((d) => d.id === departmentId);

      if (department) {
        this.selectedCourses = department.courses.map((c) => c.id);
      }
    },
    handleSelectCourse(course, selected) {
      if (selected) {
        this.selectedCourses = [...this.selectedCourses, course.id];
      } else {
        this.selectedCourses = this.selectedCourses.filter(
          (id) => id !== course.id
        );
      }
    },
    handleInvite() {
      this.loading = true;
      this.validate(['email', 'supervisorEmail', 'title', 'departmentId']);
      // const data = extractKeysIntoObject(this, [
      //   'email',
      //   'supervisorEmail',
      //   'title',
      //   'departmentId',
      //   'safetySensitive',
      //   'admin',
      //   'selectedCourses'
      // ]);

      this.loading = false;
    },
    delayTouch,
    getCoursesFromModules(modules) {
      return flatten(modules.map((module) => module.courses));
    }
  }
};
</script>

<style></style>
