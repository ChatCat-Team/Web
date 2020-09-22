<template>
  <div style="position: relative; min-height: calc(100vh - 32px)">
    <v-app-bar flat light color="white" elevation="0" style="z-index: 1000">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-h6">个人资料</v-toolbar-title>
      <v-spacer></v-spacer>
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

    <v-list two-line class="ma-4">
      <v-list-item link class="mb-8">
        <v-avatar class="avatar my-4 mx-auto" size="240">
          <v-img src="default_avatar.png" alt="用户头像"></v-img>
        </v-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon color="indigo">mdi-account-box-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>王小花</v-list-item-title>
          <v-list-item-subtitle>名字</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon>mdi-pencil-outline</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-list-item link>
        <v-list-item-action></v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>念念不忘 必有回响</v-list-item-title>
          <v-list-item-subtitle>个性签名</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon>mdi-pencil-outline</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon color="indigo">mdi-map-marker-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>哈尔滨工程大学</v-list-item-title>
          <v-list-item-subtitle>学校</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon>mdi-pencil-outline</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon color="indigo">mdi-lock-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>156 XXXX XXXX</v-list-item-title>
          <v-list-item-subtitle>手机号</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-action></v-list-item-action>

        <v-list-item-content class="danger">
          <v-list-item-title>删除账号</v-list-item-title>
          <v-list-item-subtitle>清空关于你的所有数据</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import drawerItem from '../components/drawer'
export default {
  layout: 'default',
  components: {
    'v-drawer': drawerItem,
  },
  data: () => ({
    drawer: false,
  }),
}
</script>

<style scoped>
.avatar {
  box-shadow: 0 0 48px rgba(0, 0, 0, 0.1);
}

.danger {
  color: red;
}
</style>
