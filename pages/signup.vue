<template>
  <div style="position: relative; height: 100%">
    <v-app-bar flat prominent height="240" extended>
      <v-btn id="button-back" icon>
        <NuxtLink to="/welcome" class="text-decoration-none">
          <v-icon color="grey darken-2">mdi-arrow-left</v-icon>
        </NuxtLink>
      </v-btn>
      <v-toolbar-title class="my-8">注册</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog.help" width="372">
        <template v-slot:activator="{ on, attrs }">
          <v-btn id="button-help" icon v-bind="attrs" v-on="on">
            <v-icon>mdi-help-circle-outline</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title>使用帮助</v-card-title>
          <v-card-text class="px-6 pb-2">
            注册时需要使用手机号注册，并需要输入自定义的密码和短信验证码。
          </v-card-text>
          <v-card-text class="px-6 pb-4">
            密码需要满足 8 到 24 个字符，并且必须包含字母、数字和符号。
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="deep-purple accent-4"
              @click="dialog.help = false"
            >
              知道了
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>
    <v-main>
      <div class="pa-8">
        <v-form
          v-model="valid.phone"
          :disabled="disabled"
          class="d-flex flex-column align-center"
        >
          <v-text-field
            id="input-phone"
            v-model="phone"
            :rules="rules.phone"
            type="number"
            label="手机号"
            hint="仅限中国大陆 +86 手机号"
            prepend-inner-icon="mdi-cellphone"
            required
            solo
            flat
            autofocus
            height="56"
            background-color="grey lighten-4"
            clearable
            class="full-width"
          ></v-text-field>
        </v-form>
        <v-form
          v-model="valid.password"
          :disabled="disabled"
          class="d-flex flex-column align-center"
        >
          <v-text-field
            id="input-password"
            v-model="password"
            :append-icon="
              show.password ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
            "
            :type="show.password ? 'text' : 'password'"
            :rules="rules.password"
            label="密码"
            prepend-inner-icon="mdi-form-textbox-password"
            hint="8 - 24 个字符，且包含字母、数字、符号"
            required
            solo
            flat
            height="56"
            background-color="grey lighten-4"
            counter="24"
            clearable
            class="full-width"
            @click:append="show.password = !show.password"
          ></v-text-field>
          <v-text-field
            id="input-code"
            v-model="code.input"
            :rules="rules.code"
            type="number"
            label="验证码"
            prepend-inner-icon="mdi-numeric"
            required
            solo
            flat
            height="56"
            background-color="grey lighten-4"
            clearable
            counter="6"
            :disabled="!valid.phone"
            class="full-width fix-margin"
          >
            <template v-slot:append-outer>
              <v-btn
                id="button-send-code"
                depressed
                x-large
                height="56"
                class="ml-4"
                :disabled="!!code.clock || !valid.phone"
                @click="sendCode"
              >
                {{ (code.clock === 0 ? '' : code.clock + ' ') + code.text }}
              </v-btn>
            </template>
          </v-text-field>
          <v-btn
            id="signup"
            fab
            type="submit"
            elevation="0"
            color="primary"
            large
            aria-label="注册"
            :disabled="!valid.phone || !valid.password"
            :loading="loading"
            class="mx-auto mt-6 mb-10"
            @click="signup"
          >
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
          <p id="link-login" class="grey--text darken-2 ma-0">
            已经注册过了？
            <NuxtLink to="/login" class="text-decoration-none">登录</NuxtLink>
          </p>
        </v-form>
      </div>
      <v-snackbar
        id="snackbar"
        v-model="snackbar"
        text
        vertical
        bottom
        dark
        transition="slide-y-reverse-transition"
        timeout="8000"
        class="snackbar mb-8"
      >
        <strong style="line-height: 1.75rem">
          提示信息 - {{ (snackbar && new Date().toLocaleString()) || '' }}
        </strong>
        <br />
        <span class="text-body-1">{{ text }}</span>
        <template v-slot:action="{ attrs }">
          <v-btn text color="error" v-bind="attrs" @click="snackbar = false">
            关闭
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      valid: {
        password: false,
        phone: false,
      },
      phone: '',
      password: '',
      code: {
        input: '',
        clock: 0,
        text: '发送验证码',
      },
      snackbar: false,
      timeout: 2000,
      text: '',
      rules: {
        phone: [
          (v) => !!v || '手机号为必填项',
          (v) =>
            /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(
              v
            ) || '手机号格式不对',
        ],
        password: [
          (v) => !!v || '密码为必填项',
          (v) => (v && v.length >= 8) || '最少 8 个字符',
          (v) => (v && v.length <= 24) || '最多 24 个字符',
          (v) =>
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?,.&])[A-Za-z\d$@$!%*#?,.&]{8,24}$/.test(
              v
            ) || '密码不符合要求',
        ],
        code: [
          (v) => !!v || '短信验证码为必填项',
          (v) => (v && v.length === 6) || '短信验证码为 6 个字符',
        ],
      },
      show: {
        password: false,
      },
      dialog: {
        help: false,
      },
      disabled: false,
      loading: false,
    }
  },
  methods: {
    async signup(e) {
      e.preventDefault()
      this.loading = true
      await this.$axios
        .$post('https://test.lifeni.life/api/register', {
          phone: this.phone,
          pwd: this.password,
          code: this.code.input,
        })
        .then((res) => {
          this.loading = false
          if (res.code === 0) {
            this.snackbar = true
            this.text = '注册成功，即将跳转'
            this.disabled = true
            setTimeout(() => {
              this.$router.push({ path: '/' })
            }, 2000)
          } else {
            this.snackbar = true
            this.text = res.msg
          }
        })
        .catch((err) => {
          this.snackbar = true
          this.text = '未知错误，请查看浏览器控制台获取错误的详细信息'
          this.loading = false
          console.error(err)
        })
    },
    async sendCode() {
      this.code.text = `正在发送`
      await this.$axios
        .$post('https://test.lifeni.life/api/sendmessageregister', {
          phone: this.phone,
        })
        .then((res) => {
          if (res.code === 0) {
            this.code.clock = 60
            this.code.text = `秒后可重发`

            const countdown = setInterval(() => {
              this.code.clock = this.code.clock - 1
              if (this.code.clock === 0) {
                clearInterval(countdown)
              }
            }, 1000)

            setTimeout(() => {
              this.code.text = `重新发送`
            }, 60000)
          } else {
            this.snackbar = true
            this.text = res.msg
            this.code.text = `发送失败`
          }
        })
        .catch((err) => {
          this.snackbar = true
          this.text = '未知错误，请查看浏览器控制台获取错误的详细信息'
          this.code.text = `发送失败`
          console.error(err)
        })
    },
  },
}
</script>

<style></style>
