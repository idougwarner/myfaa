<template>
  <q-layout @scroll="scrollHandler">
    <q-page-container>
      <q-page>
        <top-nav :sticky="stickyHeaderVisible" />
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import TopNav from '@client/components/top-nav';

export default {
  name: 'HomeLayout',
  components: {
    TopNav
  },
  data() {
    return {
      stickyHeaderVisible: false
    };
  },
  methods: {
    scrollHandler(details) {
      this.stickyHeaderVisible = details.position > 0;
    }
  }
};
</script>
