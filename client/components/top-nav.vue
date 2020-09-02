<template>
  <q-page-sticky expand position="top" class="z-top">
    <div
      class="q-pa-md full-width row"
      :class="{ 'bg-white shadow-1': sticky }"
    >
      <q-space />
      <div class="q-gutter-x-sm">
        <span class="text-h6 cursor-pointer">Dashboard</span>
        <span class="text-h6 cursor-pointer">E-Learning</span>
        <span class="text-h6 cursor-pointer">Order</span>
        <span class="text-h6 cursor-pointer">About Us</span>
        <span class="text-h6 cursor-pointer">Contact</span>
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
