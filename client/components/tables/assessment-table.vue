<template>
  <q-table
    class="assessment-table"
    title="Assessment"
    :data="tableData"
    :columns="columns"
    row-key="name"
    separator="cell"
  >
    <template #body="props">
      <q-tr :props="props">
        <q-td key="name" :props="props">
          {{ props.row.name }}
        </q-td>
        <q-td
          v-for="course in courses"
          :key="`course${course.id}`"
          :props="props"
        >
          <q-checkbox
            :value="Boolean(props.row[`course${course.id}`])"
            @input="handleAssess(props.row, course, $event)"
            v-if="!loading[`department${props.row.id}course${course.id}`]"
          />
          <q-spinner v-else />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import flatten from 'lodash/flatten';

export default {
  name: 'AssessmentTable',
  props: {
    modules: Array,
    departments: Array,
    assignCourse: Function
  },
  data() {
    const courses = flatten(this.modules.map((module) => module.courses));

    return {
      loading: {},
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Department Name',
          align: 'left',
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true
        },
        ...courses.map((course) => ({
          name: `course${course.id}`,
          align: 'center',
          label: course.name,
          field: `course${course.id}`
        }))
      ]
    };
  },
  computed: {
    courses() {
      return flatten(this.modules.map((module) => module.courses));
    },
    tableData() {
      return this.departments.map((department) => ({
        ...department,
        ...(department.courses || []).reduce(
          (m, course) => ({
            ...m,
            [`course${course.id}`]: true
          }),
          {}
        )
      }));
    }
  },
  methods: {
    async handleAssess(department, course, value) {
      this.$set(
        this.loading,
        `department${department.id}course${course.id}`,
        true
      );
      await this.assignCourse(department, course, value);
      this.$set(
        this.loading,
        `department${department.id}course${course.id}`,
        false
      );
    }
  }
};
</script>

<style lang="sass">
.assessment-table
  height: 400px

  td:first-child
    background-color: #c1f4cd !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
</style>
