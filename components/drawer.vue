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

        <v-list-item nuxt class="py-1 px-2" @click="logout">
          <v-list-item-action>
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-list-item-action>
          <v-list-item-title>退出登录</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    u: {
      type: Object,
      default: () => ({ name: '匿名', bio: '', avatar: '' }),
    },
  },
  data() {
    return {
      user:
        this.u ||
        this.$store.state.localStorage.userData ||
        this.$store.state.localStorage.default.userData,
    }
  },
  methods: {
    async logout() {
      await this.$axios
        .$post('https://test.lifeni.life/api/logout', {})
        .then(() => {
          this.$router.push({ path: '/welcome' })
          localStorage.clear()
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>

<style scoped>
.avatar {
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
}
</style>
