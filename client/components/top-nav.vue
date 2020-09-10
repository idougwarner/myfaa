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
        <router-link :to="{ name: 'roster' }">
          <span class="text-h6 cursor-pointer" v-if="currentUser">
            Dashboard
          </span>
        </router-link>
        <router-link :to="{ name: 'modules' }">
          <span class="text-h6 cursor-pointer">E-Learning</span>
        </router-link>
        <router-link :to="{ name: 'aboutus' }">
          <span class="text-h6 cursor-pointer">About Us</span>
        </router-link>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfdCtXSQauMbznbNhee0lzrWcEiBKCczSuXC-s13r8_8abJUA/viewform"
          target="__blank"
        >
          <span class="text-h6 cursor-pointer">Contact</span>
        </a>
        <span
          class="text-h6 cursor-pointer"
          v-if="!currentUser"
          @click="handleLogin"
        >
          Login
        </span>
        <span
          class="text-h6 cursor-pointer"
          v-if="currentUser"
          @click="handleLogout"
        >
          Logout
        </span>
      </div>
    </div>
  </q-page-sticky>
</template>

<script>
import graphql from '@client/graphql';
import { auth0 } from '@client/third-party';

export default {
  name: 'TopNav',
  props: {
    sticky: Boolean
  },
  data() {
    return {
      currentUser: null
    };
  },
  apollo: {
    currentUser: graphql.queries.currentUser
  },
  methods: {
    handleLogout() {
      auth0.logout();
    },
    handleLogin() {
      auth0.login('/', {
        allowLogin: true,
        allowSignUp: false
      });
    }
  }
};
</script>
