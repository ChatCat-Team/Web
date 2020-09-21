<template>
  <v-app dark>
    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <v-col cols="12" class="view">
          <v-row no-gutters>
            <v-col cols="12">
              <v-system-bar window dark class="bar justify-center">
                <v-icon>mdi-check</v-icon>
                <span>Connected To Server</span>
              </v-system-bar>
            </v-col>
          </v-row>
          <v-row no-gutters>
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
  box-shadow: 0 0 128px rgba(0, 0, 0, 0.15);
  overflow: hidden auto;
}
</style>

<script>
export default {}
</script>
