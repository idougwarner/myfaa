<template>
  <div class="window-height myfaa-page-content">
    <div class="text-h2 text-center q-py-md">Our Courses</div>
    <div
      class="row q-col-gutter-md q-mx-xl q-mt-md"
      v-for="(modules, index) in chunkedModules"
      :key="index"
    >
      <div class="col-6" v-for="(module, index) in modules" :key="index">
        <q-card flat bordered>
          <q-img :src="module.logoUrl" style="height: 150px;" />
          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">
              {{ module.name }}
            </div>
            <div class="text-caption text-grey">
              {{ module.description }}
            </div>
          </q-card-section>
          <q-card-section>
            <div>{{ module.coursesCount }} Courses</div>
            <div>${{ module.price }} Per Employee</div>
          </q-card-section>
          <q-card-actions>
            <q-btn flat color="primary" label="See courses" />
            <q-btn
              flat
              color="dark"
              label="Buy Now"
              @click="handleBuyNow(module)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div class="row text-h6 q-mx-xl q-mt-md">
      <div class="q-ml-md">Need custom quote?&nbsp;&nbsp;</div>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSdtTi9Ct7KLmZJnsDeNhmuGSXCyr5WHkx8XT3-WmvlBX8DCYg/viewform"
        target="__blank"
        >Contact Us</a
      >
    </div>
  </div>
</template>

<script>
import chunk from 'lodash/chunk';
import { auth0 } from '@client/third-party';
import { ROLE_NAMES } from '@server/constants';
import MODULES_OVERVIEW from '@client/graphql/ModulesOverview.gql';

export default {
  name: 'LearningModules',
  data() {
    return {
      modulesOverview: [],
      test: []
    };
  },
  apollo: {
    modulesOverview: MODULES_OVERVIEW
  },
  computed: {
    chunkedModules() {
      return chunk(this.modulesOverview, 2);
    }
  },
  methods: {
    handleBuyNow(module) {
      auth0.login('/', {
        allowLogin: false,
        allowSignUp: true,
        additionalSignUpFields: [
          {
            type: 'hidden',
            name: 'moduleId',
            value: module.id
          },
          {
            type: 'hidden',
            name: 'roleName',
            value: ROLE_NAMES.ADMIN
          }
        ]
      });
    }
  }
};
</script>
