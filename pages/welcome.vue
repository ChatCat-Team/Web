<template>
  <div class="container">
    <div
      class="background d-flex flex-column align-center justify-space-around"
    >
      <div class="header px-10 pt-8 full-width text-center">
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
              icon
              x-large
              color="white"
              class="my-4"
              id="button-qrcode"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-qrcode</v-icon>
            </v-btn>
          </template>

          <v-card class="pa-8 d-flex align-center justify-center">
            <qrcode-vue
              :value="page"
              :size="size"
              level="H"
              id="qrcode"
            ></qrcode-vue>
          </v-card>
        </v-dialog>
        <NuxtLink class="link" to="/signup">
          <v-btn
            outlined
            x-large
            dark
            class="button text-center full-width"
            id="button-signup"
            nuxt
          >
            注册
          </v-btn>
        </NuxtLink>
        <NuxtLink class="link" to="/login">
          <v-btn
            outlined
            x-large
            dark
            class="button text-center full-width"
            id="button-login"
            nuxt
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
  layout: 'blank',
  components: {
    QrcodeVue,
  },
  data: () => ({
    dialog: false,
    page: 'https://test.lifeni.life',
    size: 240,
  }),
  mounted() {
    this.page = 'https://test.lifeni.life' + this.$route.fullPath
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
      rgba(0, 0, 0, 0.3) 100%
    ),
    radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.2) 166%),
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 0% 75%,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );

  /* backdrop-filter: blur(10px); */
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
  text-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
}
</style>
