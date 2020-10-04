<template>
  <div>
    <v-list class="mt-12">
      <v-list-item>
        <v-avatar size="96" class="avatar ma-4">
          <v-img
            v-show="$store.state.localStorage.status"
            :src="user.avatar || '/default_avatar.png'"
            alt="Your Avatar"
          ></v-img>
        </v-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content class="px-4 py-8">
          <v-list-item-title class="text-h6 mb-2">
            {{ user.name || '匿名' }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-subtitle-1">
            {{ user.bio || '未设置签名' }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list nav>
      <v-list-item-group>
        <NuxtLink to="/" class="text-decoration-none">
          <v-list-item nuxt class="py-1 px-2">
            <v-list-item-action>
              <v-icon>mdi-view-dashboard-outline</v-icon>
            </v-list-item-action>
            <v-list-item-title>主页</v-list-item-title>
          </v-list-item>
        </NuxtLink>

        <NuxtLink to="/profile" class="text-decoration-none">
          <v-list-item nuxt class="py-1 px-2">
            <v-list-item-action>
              <v-icon>mdi-account-circle-outline</v-icon>
            </v-list-item-action>
            <v-list-item-title>个人资料</v-list-item-title>
          </v-list-item>
        </NuxtLink>

        <NuxtLink nuxt to="/settings" class="text-decoration-none">
          <v-list-item nuxt class="py-1 px-2">
            <v-list-item-action>
              <v-icon>mdi-cog-outline</v-icon>
            </v-list-item-action>
            <v-list-item-title>设置</v-list-item-title>
          </v-list-item>
        </NuxtLink>

        <NuxtLink to="/about" class="text-decoration-none">
          <v-list-item nuxt class="py-1 px-2">
            <v-list-item-action>
              <v-icon>mdi-information-outline</v-icon>
            </v-list-item-action>
            <v-list-item-title>关于 ChatCat</v-list-item-title>
          </v-list-item>
        </NuxtLink>

        <NuxtLink to="/welcome" class="text-decoration-none">
          <v-list-item nuxt class="py-1 px-2">
            <v-list-item-action>
              <v-icon>mdi-close-circle-outline</v-icon>
            </v-list-item-action>
            <v-list-item-title>退出登录</v-list-item-title>
          </v-list-item>
        </NuxtLink>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user:
        this.$store.state.localStorage.userData ||
        this.$store.state.localStorage.default.userData,
    }
  },
  mounted() {
    this.user =
      this.$store.state.localStorage.userData ||
      this.$store.state.localStorage.default.userData
  },
}
</script>

<style scoped>
.avatar {
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
}
</style>
