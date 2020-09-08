<template>
  <q-layout @scroll="scrollHandler">
    <q-page-container>
      <q-page>
        <top-nav :sticky="stickyHeaderVisible" />
        <router-view />
        <footer-nav />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import TopNav from '@client/components/top-nav';
import FooterNav from '@client/components/footer-nav';

export default {
  name: 'HomeLayout',
  components: {
    TopNav,
    FooterNav
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
