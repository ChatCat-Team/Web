<template>
  <div style="position: relative; min-height: calc(100vh - 32px)">
    <v-app-bar flat dark elevation="0" style="z-index: 1000">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-h6">设置</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      light
      temporary
      style="heigh: 100vh; z-index: 2000"
    >
      <v-list class="mt-12">
        <v-list-item>
          <v-avatar size="96" class="avatar ma-4">
            <v-img src="default_avatar.png" alt="Your Avatar"></v-img>
          </v-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content class="px-4 py-8">
            <v-list-item-title class="text-h6 mb-2">你的名字</v-list-item-title>
            <v-list-item-subtitle class="text-subtitle-1"
              >这里是个性签名</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list nav>
        <v-drawer-item></v-drawer-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import drawerItem from '../components/drawer'
export default {
  layout: 'default',
  components: {
    'v-drawer-item': drawerItem,
  },
  data: () => ({
    drawer: false,
  }),
}
</script>

<style></style>
