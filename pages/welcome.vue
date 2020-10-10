<template>
  <div class="container">
    <div
      class="background d-flex flex-column align-center justify-space-around"
    >
      <div class="header mb-12 px-10 py-12 full-width text-center">
        <span>
          <v-img src="/demo.svg" width="80" class="mx-auto"></v-img>
        </span>
        <h1 class="pb-12">
          <v-img src="/logo.svg" width="200" class="mx-auto"></v-img>
        </h1>
        <v-dialog v-model="dialog" width="300">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              id="button-qrcode"
              icon
              x-large
              color="white"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-qrcode</v-icon>
            </v-btn>
          </template>

          <v-card class="pa-8 d-flex align-center justify-center">
            <qrcode-vue
              id="qrcode"
              :value="page"
              :size="size"
              level="H"
            ></qrcode-vue>
          </v-card>
        </v-dialog>
        <v-spacer></v-spacer>
      </div>
      <div
        class="bar pa-8 full-width d-flex flex-column align-center justify-center"
      >
        <div class="full-width d-flex align-center justify-center">
          <NuxtLink class="link mr-8" to="/signup">
            <v-btn
              id="button-signup"
              text
              depressed
              x-large
              dark
              nuxt
              class="button text-center font-weight-bold"
            >
              注册
            </v-btn>
          </NuxtLink>
          <NuxtLink class="link" to="/login">
            <v-btn
              id="button-login"
              text
              depressed
              x-large
              dark
              nuxt
              class="button text-center font-weight-bold"
            >
              登录
            </v-btn>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
export default {
  components: {
    QrcodeVue,
  },
  data: () => ({
    dialog: false,
    page: 'http://test.lifeni.life',
    size: 240,
  }),
  mounted() {
    this.page = 'http://test.lifeni.life' + this.$route.fullPath
  },
}
</script>

<style scoped>
.bar {
  position: absolute;
  left: 0;
  bottom: 0;
}

.container {
  min-height: 100vh;
  padding: 0;
  background-image: url('https://lifeni-test.oss-cn-beijing.aliyuncs.com/background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #242424;
}

.background {
  width: 100%;
  height: 100%;
  min-height: 100vh;

  background-attachment: fixed;
  background-image: radial-gradient(
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.65) 100%
    ),
    radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.4) 166%),
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 0% 75%,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );

  /* backdrop-filter: brightness(0.8); */
}

.link {
  width: 100%;
  text-decoration: none;
}

.button {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
