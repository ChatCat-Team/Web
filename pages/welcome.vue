<template>
  <div class="container">
    <div class="background d-flex flex-column align-center justify-end">
      <div class="header px-10 py-4 full-width">
        <h1 class="font-weight-light white--text">ChatCat</h1>
        <h2 class="font-weight-light white--text">一个简单的聊天室</h2>
        <v-spacer></v-spacer>
      </div>
      <div class="bar pa-8 full-width d-flex align-center justify-center">
        <NuxtLink class="link" to="/signup">
          <v-btn outlined x-large dark class="button text-center mr-4" nuxt>
            注册
          </v-btn>
        </NuxtLink>
        <NuxtLink class="link" to="/login">
          <v-btn outlined x-large dark class="button text-center" nuxt>
            登录
          </v-btn>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'blank',
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

  background-attachment: fixed;
  background-image: radial-gradient(
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
    ),
    radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%),
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 0% 75%,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
}

.link {
  width: calc(50% - 12px);
  margin: 0 6px;
  text-decoration: none;
}

.button {
  width: 100%;
}
</style>
