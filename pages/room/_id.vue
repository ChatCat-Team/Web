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
    <v-sheet class="window d-flex flex-column align-center justify-center">
      <h3 class="text-h6 grey--text lighten-2">没有消息</h3>
    </v-sheet>
    <div class="bar white pa-4 full-width">
      <v-text-field
        v-model="message"
        filled
        full-width
        dense
        counter
        label="输入消息，回车发送"
        hint="当前为演示版本，不代表最终效果"
        persistent-hint
        single-line
        type="text"
      ></v-text-field>
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
  height: calc(100vh - 32px - 56px - 96px);
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
