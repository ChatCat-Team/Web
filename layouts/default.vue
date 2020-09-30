<template>
  <v-app>
    <v-container fluid class="pa-0">
      <v-row no-gutters class="mask">
        <v-col id="view" cols="12" class="view">
          <v-row no-gutters>
            <v-col cols="12">
              <v-system-bar window dark class="bar justify-center">
                <v-icon>mdi-check</v-icon>
                <span>Connected To Server</span>
              </v-system-bar>
            </v-col>
          </v-row>
          <v-row no-gutters class="screen">
            <v-col cols="12" style="min-height： 100vh">
              <nuxt />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.bar {
  width: 100%;
}

.view {
  width: 100%;
  max-width: 420px;
  min-height: 100vh;
  margin: 0 auto;
  box-shadow: 0 0 128px rgba(0, 0, 0, 0.2);
  overflow: hidden auto;
}

.mask {
  background-color: #ffffff;
}

.screen {
  background-color: #ffffff;
}
</style>

<style>
.font-12 {
  font-size: 12px !important;
}
.font-14 {
  font-size: 14px !important;
}
.font-16 {
  font-size: 16px !important;
}
.font-18 {
  font-size: 18px !important;
}
.font-20 {
  font-size: 20px !important;
}
.font-22 {
  font-size: 22px !important;
}
.font-24 {
  font-size: 24px !important;
}
</style>

<script>
export default {
  mounted() {
    return this.init()
  },
  methods: {
    init() {
      if (process.client) {
        document.documentElement.className =
          'font-' +
          (this.$store.state.localStorage.settings.fontSize ||
            this.$store.state.localStorage.default.settings.fontSize)
        this.$meta().refresh()
        this.$vuetify.theme.themes.light.primary =
          this.$store.state.localStorage.settings.themeColor ||
          this.$store.state.localStorage.default.settings.themeColor
        // console.log(this.$vuetify.theme.themes.light.primary)
      }
    },
  },
}
</script>
