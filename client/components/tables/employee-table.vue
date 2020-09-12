<template>
  <q-table
    class="employee-table"
    title="Employees"
    :data="data"
    :columns="columns"
    row-key="name"
    flat
    bordered
  />
</template>

<script>
export default {
  name: 'EmployeeTable',
  props: {
    employees: Array
  },
  data() {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: (row) => `${row.firstName} ${row.lastName}`,
          format: (val) => `${val}`,
          sortable: true
        },
        {
          name: 'email',
          align: 'center',
          label: 'Email',
          field: 'email',
          sortable: true
        },
        {
          name: 'phoneNumber',
          align: 'center',
          label: 'Phone Number',
          field: 'phoneNumber',
          sortable: true
        }
      ],

      data: this.employees
    };
  }
};
</script>

<style lang="sass">
.employee-table
  /* height or max-height is important */
  height: 310px

  thead tr th
    position: sticky
    z-index: 1
    background: #fff

  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
