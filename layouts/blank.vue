<template>
  <v-app class="view">
    <div class="mask"></div>
    <nuxt />
  </v-app>
</template>

<script>
export default {}
</script>

<style scoped>
.view {
  width: 100%;
  max-width: 420px;
  min-height: 100vh;
  margin: 0 auto;
  box-shadow: 0 0 128px rgba(0, 0, 0, 0.2);
  overflow: hidden auto;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
}
</style>
