<template>
  <div style="position: relative; height: 100%">
    <v-app-bar prominent height="240" extended>
      <v-btn icon>
        <NuxtLink to="/welcome" class="text-decoration-none">
          <v-icon color="grey darken-2">mdi-arrow-left</v-icon>
        </NuxtLink>
      </v-btn>

      <v-toolbar-title class="my-8">登录</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tab id="password-tab" href="#tab-password">密码</v-tab>
          <v-tab id="code-tab" href="#tab-code">短信验证码</v-tab>
        </v-tabs>
      </template>

      <v-dialog v-model="dialog.help" width="372">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-help-circle-outline</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title>使用帮助</v-card-title>
          <v-card-text class="px-6 pb-4">
            登录时可以使用密码和短信验证码两种方式。
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
      <v-tabs-items v-model="tab" class="pa-8">
        <v-tab-item value="tab-password">
          <v-form
            v-model="valid.password"
            :disabled="disabled"
            class="d-flex flex-column align-center"
          >
            <v-text-field
              id="input-phone-1"
              v-model="phone"
              :rules="rules.phone"
              type="number"
              label="手机号"
              hint="仅限中国大陆 +86 手机号"
              prepend-inner-icon="mdi-cellphone"
              required
              solo
              flat
              height="56"
              background-color="grey lighten-4"
              clearable
              class="full-width"
            ></v-text-field>
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

            <v-dialog v-model="dialog.captcha" width="372">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon> </v-btn>
                <v-btn
                  id="login-1"
                  fab
                  elevation="0"
                  color="primary"
                  class="mx-auto mt-6 mb-10"
                  large
                  aria-label="登录"
                  :disabled="!valid.password"
                  :loading="loading"
                  v-bind="attrs"
                  v-on="on"
                  @click="captcha = ''"
                >
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-form v-model="valid.captcha">
                  <v-card-title>图形验证</v-card-title>
                  <v-card-text class="px-4 pb-2">
                    若要继续，请输入下面的图形验证码。
                  </v-card-text>
                  <v-row no-gutters>
                    <v-col cols="6">
                      <v-img
                        :src="base64"
                        class="mx-4 mt-2 mr-0"
                        style="border-radius: 4px"
                        @click="getCode"
                      ></v-img>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="captcha"
                        solo
                        flat
                        height="56"
                        background-color="grey lighten-4"
                        clearable
                        counter="4"
                        hint="4 个字符"
                        persistent-hint
                        autofocus
                        :rules="rules.captcha"
                        class="mx-4 mt-2"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="deep-purple accent-4"
                      @click="dialog.captcha = false"
                    >
                      取消登录
                    </v-btn>
                    <v-btn
                      text
                      color="deep-purple accent-4"
                      :disabled="!valid.captcha"
                      @click="loginPassword"
                    >
                      验证
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>

            <p class="grey--text darken-2 ma-0">
              忘记密码？
              <NuxtLink
                id="link-forget-password-1"
                to="/forget-password"
                class="text-decoration-none"
                >重置密码</NuxtLink
              >
            </p>
            <p class="grey--text darken-2 ma-0">
              还没有注册？
              <NuxtLink
                id="link-signup-1"
                to="/signup"
                class="text-decoration-none"
                >加入我们</NuxtLink
              >
            </p>
          </v-form>
        </v-tab-item>
        <v-tab-item value="tab-code">
          <v-form
            v-model="valid.code"
            :disabled="disabled"
            class="d-flex flex-column align-center"
          >
            <v-form v-model="valid.phone" class="full-width">
              <v-text-field
                id="input-phone-2"
                v-model="phone"
                :rules="rules.phone"
                type="number"
                label="手机号"
                hint="仅限中国大陆 +86 手机号"
                prepend-inner-icon="mdi-cellphone"
                required
                solo
                flat
                height="56"
                background-color="grey lighten-4"
                clearable
                class="full-width"
              ></v-text-field>
            </v-form>
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
              :disabled="!valid.phone"
              class="full-width fix-margin"
              counter="6"
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
              id="login-2"
              fab
              elevation="0"
              color="primary"
              class="mx-auto mt-6 mb-10"
              large
              aria-label="登录"
              :disabled="!valid.code"
              :loading="loading"
              @click="loginCode"
            >
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
            <p class="grey--text darken-2 ma-0">
              忘记密码？<NuxtLink
                id="link-forget-password-1"
                to="/forget-password"
                class="text-decoration-none"
                >重置密码</NuxtLink
              >
            </p>
            <p class="grey--text darken-2 ma-0">
              还没有注册？
              <NuxtLink
                id="link-signup-1"
                to="/signup"
                class="text-decoration-none"
                >加入我们</NuxtLink
              >
            </p>
          </v-form>
        </v-tab-item>
      </v-tabs-items>
      <v-snackbar id="snackbar" v-model="snackbar" bottom class="mb-8">
        {{ text }}
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
import axios from 'axios'
export default {
  async asyncData() {
    return await axios
      .post('https://test.lifeni.life/api/sendgraphicverification', {})
      .then((res) => {
        if (res.data.code === 0) {
          return {
            base64: res.data.extend.imgStr,
          }
        } else {
          return {
            snackbar: true,
            text: res.msg,
          }
        }
      })
      .catch((err) => {
        console.error('获取图形验证码', err)
      })
  },
  data() {
    return {
      tab: null,
      valid: {
        password: false,
        code: false,
        captcha: false,
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
      captcha: '',
      base64: '',
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
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,24}$/.test(
              v
            ) || '密码不符合要求',
        ],
        code: [
          (v) => !!v || '短信验证码为必填项',
          (v) => (v && v.length === 6) || '短信验证码为 6 个字符',
        ],
        captcha: [
          (v) => !!v || '必填项',
          (v) => (v && v.length === 4) || '必须 4 个字符',
        ],
      },
      show: {
        password: false,
      },
      dialog: {
        help: false,
        captcha: false,
      },
      disabled: false,
      loading: false,
    }
  },
  methods: {
    async loginPassword() {
      this.loading = true
      await this.$axios
        .$post('https://test.lifeni.life/api/login', {
          phone: this.phone,
          pwd: this.password,
          code: this.captcha,
        })
        .then((res) => {
          this.loading = false
          this.dialog.captcha = false
          if (res.code === 0) {
            this.disabled = true
            this.$router.push({ path: '/' })
          } else {
            this.getCode()
            this.snackbar = true
            this.text = res.msg
          }
        })
        .catch((err) => {
          this.getCode()
          this.snackbar = true
          this.text = '未知错误'
          this.loading = false
          console.error(err)
        })
    },
    async loginCode() {
      this.loading = true
      await this.$axios
        .$post('https://test.lifeni.life/api/loginByMessage', {
          phone: this.phone,
          code: this.code.input,
        })
        .then((res) => {
          this.loading = false
          if (res.code === 0) {
            this.disabled = true
            this.$router.push({ path: '/' })
          } else {
            this.snackbar = true
            this.text = res.msg
          }
        })
        .catch((err) => {
          this.snackbar = true
          this.text = '未知错误'
          this.loading = false
          console.error(err)
        })
    },
    async sendCode() {
      this.code.text = `正在发送`
      await this.$axios
        .$post('https://test.lifeni.life/api/sendmessagelogin', {
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
          this.text = '未知错误'
          this.code.text = `发送失败`
          console.error(err)
        })
    },
    async getCode() {
      await axios
        .post('https://test.lifeni.life/api/sendgraphicverification', {})
        .then((res) => {
          if (res.data.code === 0) {
            this.base64 = res.data.extend.imgStr
          } else {
            this.snackbar = true
            this.text = res.msg
          }
        })
        .catch((err) => {
          console.error('获取图形验证码', err)
        })
    },
    to(n) {
      if (n === null) {
        return ''
      }
    },
  },
}
</script>

<style></style>
