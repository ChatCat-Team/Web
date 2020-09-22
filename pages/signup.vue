<template>
  <div style="position: relative; height: 100%">
    <v-app-bar dark flat prominent extended>
      <v-btn icon color="white">
        <NuxtLink to="/welcome" class="white--text text-decoration-none">
          <v-icon>mdi-arrow-left</v-icon>
        </NuxtLink>
      </v-btn>
      <v-toolbar-title>注册</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog.help" width="372">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="white" v-bind="attrs" v-on="on">
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
        <v-form v-model="valid" class="d-flex flex-column align-center">
          <v-text-field
            v-model="phone"
            :rules="rules.phone"
            type="number"
            label="手机号"
            hint="仅限中国大陆 +86 手机号"
            prepend-inner-icon="mdi-cellphone"
            required
            filled
            clearable
            class="full-width"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show.password ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show.password ? 'text' : 'password'"
            :rules="rules.password"
            label="密码"
            prepend-inner-icon="mdi-form-textbox-password"
            hint="8 - 24 个字符，且包含字母、数字、符号"
            required
            filled
            counter="24"
            clearable
            class="full-width"
            @click:append="show.password = !show.password"
          ></v-text-field>
          <v-text-field
            v-model="code"
            :rules="rules.code"
            type="number"
            label="验证码"
            prepend-inner-icon="mdi-numeric"
            required
            filled
            clearable
            class="full-width fix-margin"
            counter="6"
          >
            <template v-slot:append-outer>
              <v-btn depressed x-large class="my-1 ml-4">发送验证码</v-btn>
            </template>
          </v-text-field>
          <v-btn
            fab
            color="primary"
            class="mx-auto mt-6 mb-10"
            large
            aria-label="注册"
            :disabled="!valid"
            @click="signup"
          >
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
          <p class="grey--text darken-2 ma-1">
            已经注册过了？
            <NuxtLink to="/login" class="text-decoration-none">登录</NuxtLink>
          </p>
        </v-form>
      </div>
    </v-main>
  </div>
</template>

<script>
export default {
  layout: 'blank',
  data() {
    return {
      tab: null,
      valid: false,
      phone: '',
      password: '',
      code: '',
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
          (v) => v.length >= 8 || '最少 8 个字符',
          (v) => v.length <= 24 || '最多 24 个字符',
        ],
        code: [
          (v) => !!v || '短信验证码为必填项',
          (v) => v.length === 6 || '短信验证码为 6 个字符',
        ],
      },
      show: {
        password: false,
      },
      dialog: {
        help: false,
      },
    }
  },
  methods: {
    async signup() {
      await this.$axios
        .$post('https://test.lifeni.life/api/register', {
          phone: this.phone,
          pwd: this.password,
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.error(err)
        })
      // this.$router.push({ path: '/' })
    },
  },
}
</script>

<style></style>
