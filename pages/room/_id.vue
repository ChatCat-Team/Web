<template>
  <div style="position: relative; height: 100vh">
    <v-app-bar flat color="white" style="z-index: 1000">
      <v-btn icon>
        <NuxtLink to="/" class="text-decoration-none">
          <v-icon color="grey darken-2">mdi-arrow-left</v-icon>
        </NuxtLink>
      </v-btn>
      <v-toolbar-title> Room Title </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-chip color="grey lighten-4">{{ id }}</v-chip>
    </v-app-bar>
    <v-sheet class="window d-flex flex-column align-center justify-center">
      <h3 class="text-h6 grey--text lighten-2">没有消息</h3>
    </v-sheet>
    <div class="bar white pa-4 full-width">
      <v-text-field
        v-model="message"
        solo
        flat
        background-color="grey lighten-4"
        hide-details
        label="在此输入消息"
        single-line
        type="text"
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
export default {
  middleware: ['check'],
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
  height: calc(100vh - 32px - 56px - 56px);
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
