<template>
  <div>
    <div class="row items-center justify-evenly window-height">
      <div>
        <div class="q-gutter-y-md">
          <div class="text-h2 text-weight-medium text-center">
            Professional Online
          </div>
          <div class="text-h2 text-weight-medium">
            Training for FAA Certified
          </div>
          <div class="text-h2 text-weight-medium text-center">
            OEMs & Operators
          </div>
        </div>
        <div class="q-mt-xl">
          <div class="text-h6 what-offer">
            We offer training that exceeds the requirements of<br />
            manufacturers, air carriers and repair stations in<br />
            accordance with 14 CFR Parts 21, 121, 135 & 145
          </div>
        </div>
      </div>
      <img src="../assets/images/jet.png" style="max-width: 450px;" />
    </div>
    <div class="row justify-center q-py-xl">
      <div class="col-6">
        <q-video
          :ratio="16 / 9"
          src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"
        />
      </div>
    </div>
    <q-intersection
      transition="scale"
      class="full-width q-mt-xl"
      once
      style="height: 400px;"
    >
      <div class="row items-center justify-evenly">
        <img
          src="../assets/images/dashboard.png"
          style="max-width: 450px;"
          class="col-6"
        />
        <div class="col-6 text-h6">
          MyFAA.COM provides the best training solutions and user interface by
          automating the administrator Dashboard, which means you no longer must
          maintain a training matrix, send out training reminders or track when
          to submit for the FAA Awards Program. New employee setup and archiving
          a former employee is now a quick and simple process.
        </div>
      </div>
    </q-intersection>
    <q-intersection
      transition="scale"
      class="full-width q-mt-xl"
      once
      style="height: 400px;"
    >
      <div class="row items-center justify-evenly">
        <img
          src="../assets/images/faa-demonstrate.png"
          style="max-width: 450px;"
          class="col-6"
        />
        <div class="col-6 text-h6">
          Impress the FAA demonstrating how quick, clean, and orderly the
          training program operates and retains training documents that support
          your operation!
        </div>
      </div>
    </q-intersection>
  </div>
</template>

<script>
export default {
  name: 'Home'
};
</script>
