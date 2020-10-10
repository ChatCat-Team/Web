<template>
  <div class="container">
    <div
      class="background d-flex flex-column align-center justify-space-around"
    >
      <div class="header px-10 pt-12 full-width text-center">
        <h1 class="title text-h4 font-weight-light white--text py-2">
          ChatCat
        </h1>
        <h2 class="title text-h5 font-weight-light white--text">
          一个简单的聊天室
        </h2>
        <v-chip outlined dark class="my-4"> 演示版本 </v-chip>
        <v-spacer></v-spacer>
      </div>
      <div
        class="bar pa-8 full-width d-flex flex-column align-center justify-center"
      >
        <v-dialog v-model="dialog" width="300">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              id="button-qrcode"
              icon
              x-large
              color="white"
              class="my-4"
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
        <NuxtLink class="link" to="/signup">
          <v-btn
            id="button-signup"
            outlined
            x-large
            dark
            nuxt
            class="button text-center full-width"
          >
            注册
          </v-btn>
        </NuxtLink>
        <NuxtLink class="link" to="/login">
          <v-btn
            id="button-login"
            outlined
            x-large
            dark
            nuxt
            class="button text-center full-width"
          >
            登录
          </v-btn>
        </NuxtLink>
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
.container {
  min-height: 100vh;
  padding: 0;
  background-image: url('/background.jpg');
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
  margin: 8px 0;
  text-decoration: none;
}

.button {
  width: 100%;
}

.title {
  text-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
}
</style>
