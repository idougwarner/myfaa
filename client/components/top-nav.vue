<template>
  <q-page-sticky expand position="top" class="z-top">
    <div
      class="q-pa-md full-width row"
      :class="{ 'bg-white shadow-1': sticky }"
    >
      <q-space />
      <div class="q-gutter-x-sm">
        <router-link :to="{ name: 'home' }">
          <span class="text-h6 cursor-pointer">Home</span>
        </router-link>
        <span class="text-h6 cursor-pointer">Dashboard</span>
        <router-link :to="{ name: 'modules' }">
          <span class="text-h6 cursor-pointer">E-Learning</span>
        </router-link>
        <router-link :to="{ name: 'order' }">
          <span class="text-h6 cursor-pointer">Order</span>
        </router-link>
        <router-link :to="{ name: 'aboutus' }">
          <span class="text-h6 cursor-pointer">About Us</span>
        </router-link>
        <router-link :to="{ name: 'contact' }">
          <span class="text-h6 cursor-pointer">Contact</span>
        </router-link>
      </div>
    </div>
  </q-page-sticky>
</template>

<script>
export default {
  name: 'TopNav',
  props: {
    sticky: Boolean
  }
};
</script>
