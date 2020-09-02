<template>
  <div class="window-height column justify-center">
    <div class="text-h2 text-center">Our Courses</div>
    <div class="row q-col-gutter-md q-mx-xl q-mt-lg">
      <div class="offset-2 col-4">
        <q-card flat bordered>
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />
          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">
              Repair Station / Air Carrier Training Modules
            </div>
            <div class="text-caption text-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </q-card-section>
          <q-card-actions>
            <q-btn flat color="primary" label="See course" />
            <q-btn flat color="dark" label="Buy Now" />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-4">
        <q-card flat bordered>
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />
          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">
              Manufacturing Training Modules
            </div>
            <div class="text-caption text-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </q-card-section>
          <q-card-actions>
            <q-btn flat color="primary" label="See course" />
            <q-btn flat color="dark" label="Buy Now" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LearningModules'
};
</script>
