<template>
  <div style="position: relative; height: 100%">
    <v-app-bar flat prominent height="240" extended>
      <v-btn icon>
        <NuxtLink to="/welcome" class="text-decoration-none">
          <v-icon color="grey darken-2">mdi-arrow-left</v-icon>
        </NuxtLink>
      </v-btn>

      <v-toolbar-title class="my-8">重置密码</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog.help" width="372">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-help-circle-outline</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title>使用帮助</v-card-title>
          <v-card-text class="px-6 pb-4">
            找回密码需要进行短信验证。如果你更换了手机号，请与我们联系：help@example.com。
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
          v-model="valid.password"
          class="d-flex flex-column align-center"
        >
          <v-text-field
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
            v-model="code"
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
            class="full-width fix-margin"
            counter="6"
          >
            <template v-slot:append-outer>
              <v-btn depressed x-large height="56" class="ml-4">
                发送验证码
              </v-btn>
            </template>
          </v-text-field>
          <v-text-field
            v-model="password.first"
            :append-icon="show.password ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show.password ? 'text' : 'password'"
            :rules="rules.password"
            label="新的密码"
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
            v-model="password.second"
            :append-icon="show.password ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show.password ? 'text' : 'password'"
            :rules="rules.password"
            label="再输入一次新的密码"
            prepend-inner-icon="mdi-form-textbox-password"
            hint="两次输入的密码需要一致"
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
          <v-btn
            fab
            elevation="0"
            color="primary"
            class="mx-auto mt-6 mb-10"
            large
            aria-label="保存"
            @click="save"
          >
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
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
      valid: {
        password: false,
        code: false,
      },
      phone: null,
      password: {
        first: '',
        second: '',
      },
      code: null,
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
        code: [(v) => !!v || '短信验证码为必填项'],
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
    save() {
      this.$router.push({ path: '/' })
    },
  },
}
</script>

<style></style>
