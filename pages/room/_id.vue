<template>
  <div style="position: relative; height: calc(100vh - 32px)">
    <v-app-bar flat dark style="z-index: 1000">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title> Room Title </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-chip outlined>{{ id }}</v-chip>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      light
      temporary
      style="heigh: 100vh; z-index: 2000"
    >
      <v-drawer></v-drawer>
    </v-navigation-drawer>
    <v-sheet class="window d-flex flex-column align-center justify-center">
      <h3 class="text-h6 grey--text lighten-2">没有消息</h3>
    </v-sheet>
    <div class="bar white pa-4 full-width">
      <v-text-field
        v-model="message"
        solo
        flat
        hide-details
        label="在此输入消息"
        single-line
        type="text"
        background-color="grey lighten-4"
        class="fix-margin"
      >
        <template v-slot:append-outer>
          <v-btn
            rounded
            color="primary"
            elevation="0"
            width="48"
            height="48"
            min-width="48"
            class="ml-4"
          >
            <v-icon>mdi-send-outline</v-icon>
          </v-btn>
        </template>
        <!-- <template v-slot:prepend>
          <v-btn
            rounded
            elevation="0"
            width="48"
            height="48"
            min-width="48"
            class="mr-4"
          >
            <v-icon>mdi-image-outline</v-icon>
          </v-btn>
        </template> -->
      </v-text-field>
    </div>
  </div>
</template>

<script>
import drawerItem from '../../components/drawer'
export default {
  layout: 'default',
  components: {
    'v-drawer': drawerItem,
  },
  asyncData({ params }) {
    return {
      id: params.id,
    }
  },
  data: () => ({
    drawer: false,
    message: '',
  }),
  validate({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id)
  },
}
</script>

<style scoped>
.window {
  height: calc(100vh - 32px - 56px - 80px);
  background-color: #f0f0f0;
}
.bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: 420px;
}
</style>
