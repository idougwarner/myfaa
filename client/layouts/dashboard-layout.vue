<template>
  <q-layout view="lHh Lpr lff" container class="window-height">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Header</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above :width="250" :breakpoint="400">
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item to="/assessment" v-ripple>
            <q-item-section avatar>
              <q-icon name="event_note" />
            </q-item-section>

            <q-item-section>
              Need Assessment
            </q-item-section>
          </q-item>

          <q-item to="/roster" v-ripple>
            <q-item-section avatar>
              <q-icon name="group" />
            </q-item-section>

            <q-item-section>
              Employee Roster
            </q-item-section>
          </q-item>

          <q-item to="/training-matrix" v-ripple>
            <q-item-section avatar>
              <q-icon name="school" />
            </q-item-section>

            <q-item-section>
              Training Matrix
            </q-item-section>
          </q-item>

          <q-item to="/training-notifications" v-ripple>
            <q-item-section avatar>
              <q-icon name="notifications" />
            </q-item-section>

            <q-item-section>
              Training Notifications
            </q-item-section>
          </q-item>

          <q-item to="/faa-amt-awards" v-ripple>
            <q-item-section avatar>
              <q-icon name="emoji_events" />
            </q-item-section>

            <q-item-section>
              FAA AMT Awards
            </q-item-section>
          </q-item>

          <q-item to="/audit" v-ripple>
            <q-item-section avatar>
              <q-icon name="gavel" />
            </q-item-section>

            <q-item-section>
              Audit
            </q-item-section>
          </q-item>

          <q-item to="/admins" v-ripple>
            <q-item-section avatar>
              <q-icon name="admin_panel_settings" />
            </q-item-section>

            <q-item-section>
              Admins
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px;"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Doug Warner</div>
          <div>Administrator</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'DashboardLayout'
};
</script>

<style></style>
