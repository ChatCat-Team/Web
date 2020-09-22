<template>
  <div style="position: relative; height: calc(100vh - 32px)">
    <v-app-bar flat color="white" elevation="0" style="z-index: 1000">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-h6">测试一下 </v-toolbar-title>
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
  }),
  validate({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id)
  },
}
</script>

<style></style>
