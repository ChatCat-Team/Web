<template>
  <div style="position: relative; min-height: 100vh">
    <v-app-bar flat light color="white" elevation="0">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-h6">个人资料</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      light
      temporary
      style="heigh: 100vh; z-index: 2000"
    >
      <v-drawer v-if="drawer" :u="user"></v-drawer>
    </v-navigation-drawer>

    <v-list two-line class="ma-4">
      <v-dialog v-model="dialog.avatar" width="372" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-list-item link class="mb-8" v-bind="attrs" v-on="on">
            <v-avatar class="avatar my-4 mx-auto" size="240">
              <v-img
                :src="
                  user.avatar || 'https://test.lifeni.life/default_avatar.png'
                "
                alt="用户头像"
              ></v-img>
            </v-avatar>
          </v-list-item>
        </template>
        <v-card>
          <v-card-title>修改头像</v-card-title>

          <div class="mx-4 mt-4 mb-8 px-8 py-4 d-flex justify-space-around">
            <v-file-input
              id="file-input"
              :rules="rules.avatar"
              accept="image/png, image/jpeg, image/bmp, image/webp"
              placeholder="选择一个图片"
              prepend-icon=""
              hide-input
              label="Avatar"
              class="ma-0 pa-0 fix-margin"
            >
              <template v-slot:append-outer>
                <v-btn
                  rounded
                  elevation="0"
                  width="100"
                  height="100"
                  class="upload mx-4"
                  @click="uploadAvatar"
                >
                  <v-img
                    v-if="image"
                    :src="image"
                    width="100"
                    height="100"
                    style="border-radius: 100px"
                    alt="用户头像预览"
                  ></v-img>
                  <v-icon v-else x-large>mdi-camera-outline</v-icon>
                </v-btn>
              </template>
            </v-file-input>
            <v-btn
              rounded
              elevation="0"
              width="100"
              height="100"
              class="upload mx-4"
              @click="
                input.avatar = 'https://test.lifeni.life/default_avatar.png'
                image = ''
              "
            >
              <v-icon x-large>mdi-cancel</v-icon>
            </v-btn>
          </div>

          <v-card-text class="px-6 pb-2">
            上传一张不超过 1MB 的图片（支持 .jpg .png .gif .webp
            格式），或者清除你设置的头像
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="deep-purple accent-4"
              @click="
                dialog.avatar = false
                input.avatar = ''
              "
            >
              取消操作
            </v-btn>
            <v-btn
              text
              color="deep-purple accent-4"
              :disabled="
                user.avatar === input.avatar ||
                input.avatar === null ||
                input.avatar === ''
                  ? ''
                  : false
              "
              @click="sendAvatar"
            >
              确认修改
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog.name" width="372" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-list-item link v-bind="attrs" v-on="on">
            <v-list-item-icon>
              <v-icon color="indigo">mdi-account-box-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ user.name || '匿名' }}</v-list-item-title>
              <v-list-item-subtitle>名字</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon>mdi-pencil-outline</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </template>
        <v-card>
          <v-form v-model="valid.name">
            <v-card-title>修改名字</v-card-title>
            <v-text-field
              v-model="input.name"
              :placeholder="user.name"
              solo
              flat
              height="56"
              background-color="grey lighten-4"
              clearable
              autofocus
              counter="24"
              :rules="rules.name"
              hint="名字最大 24 个字符"
              persistent-hint
              class="mx-4 mt-2"
            ></v-text-field>

            <v-card-actions>
              <v-btn
                text
                color="deep-purple accent-4"
                @click="
                  input.name = $store.state.localStorage.default.userData.name
                "
              >
                恢复默认
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                text
                color="deep-purple accent-4"
                @click="
                  dialog.name = false
                  input.name = ''
                "
              >
                取消操作
              </v-btn>
              <v-btn
                text
                type="submit"
                color="deep-purple accent-4"
                :disabled="
                  input.name === user.name ||
                  input.name === null ||
                  input.name === '' ||
                  !valid.name
                    ? ''
                    : false
                "
                :loading="loading"
                @click="sendName"
              >
                确认修改
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog.bio" width="372" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-list-item link v-bind="attrs" v-on="on">
            <v-list-item-icon>
              <v-icon color="indigo">mdi-card-text-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{
                user.bio || '未设置签名'
              }}</v-list-item-title>
              <v-list-item-subtitle>个性签名</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon>mdi-pencil-outline</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </template>
        <v-card>
          <v-form v-model="valid.bio">
            <v-card-title>修改个性签名</v-card-title>
            <v-textarea
              v-model="input.bio"
              :placeholder="user.bio"
              solo
              flat
              background-color="grey lighten-4"
              clearable
              autofocus
              auto-grow
              counter="100"
              :rules="rules.bio"
              hint="个性签名最大 100 个字符"
              persistent-hint
              class="mx-4 mt-2"
            ></v-textarea>

            <v-card-actions>
              <v-btn
                text
                color="deep-purple accent-4"
                @click="
                  input.bio = $store.state.localStorage.default.userData.bio
                "
              >
                恢复默认
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                text
                color="deep-purple accent-4"
                @click="
                  dialog.bio = false
                  input.bio = ''
                "
              >
                取消操作
              </v-btn>
              <v-btn
                text
                type="submit"
                color="deep-purple accent-4"
                :disabled="
                  input.bio === user.bio ||
                  input.bio === null ||
                  input.bio === '' ||
                  !valid.bio
                    ? ''
                    : false
                "
                :loading="loading"
                @click="sendBio"
              >
                确认修改
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog.location" width="372" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-list-item link v-bind="attrs" v-on="on">
            <v-list-item-icon>
              <v-icon color="indigo">mdi-map-marker-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ user.location || '地球某处' }}
              </v-list-item-title>
              <v-list-item-subtitle>位置</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon>mdi-pencil-outline</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </template>
        <v-card>
          <v-form v-model="valid.location">
            <v-card-title>修改位置</v-card-title>
            <v-text-field
              v-model="input.location"
              :placeholder="user.location"
              solo
              flat
              height="56"
              background-color="grey lighten-4"
              clearable
              autofocus
              counter="24"
              :rules="rules.location"
              hint="位置最大 24 个字符"
              persistent-hint
              class="mx-4 mt-2"
            ></v-text-field>

            <v-card-actions>
              <v-btn
                text
                color="deep-purple accent-4"
                @click="
                  input.location =
                    $store.state.localStorage.default.userData.location
                "
              >
                恢复默认
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                text
                color="deep-purple accent-4"
                @click="
                  dialog.location = false
                  input.location = ''
                "
              >
                取消操作
              </v-btn>
              <v-btn
                text
                type="submit"
                color="deep-purple accent-4"
                :disabled="
                  input.location === user.location ||
                  input.location === null ||
                  input.location === '' ||
                  !valid.location
                    ? ''
                    : false
                "
                :loading="loading"
                @click="sendLocation"
              >
                确认修改
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon color="indigo">mdi-phone-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{ user.phone || 'XXX XXXX XXXX' }}
          </v-list-item-title>
          <v-list-item-subtitle>手机号</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-dialog v-model="dialog.password" width="372" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-list-item link class="mt-8" v-bind="attrs" v-on="on">
            <v-list-item-icon>
              <v-icon color="indigo">mdi-lock-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title> 修改密码 </v-list-item-title>
              <v-list-item-subtitle
                >需要提供当前密码和新密码</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon>mdi-pencil-outline</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </template>
        <v-card>
          <v-card-title>修改密码</v-card-title>
          <v-form v-model="valid.password">
            <v-text-field
              v-model="password.old"
              :append-icon="
                show.old ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
              "
              :type="show.old ? 'text' : 'password'"
              :rules="rules.password"
              label="旧的密码"
              prepend-inner-icon="mdi-form-textbox-password"
              hint="新旧密码必须不同"
              persistent-hint
              autofocus
              required
              solo
              flat
              height="56"
              background-color="grey lighten-4"
              counter="24"
              clearable
              class="mx-4 mt-2"
              @click:append="show.old = !show.old"
            ></v-text-field>
            <v-text-field
              v-model="password.new"
              :append-icon="
                show.new ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
              "
              :type="show.new ? 'text' : 'password'"
              :rules="rules.confirm"
              label="新的密码"
              prepend-inner-icon="mdi-form-textbox-password"
              hint="8 - 24 个字符，且包含字母、数字、符号"
              persistent-hint
              required
              solo
              flat
              height="56"
              background-color="grey lighten-4"
              counter="24"
              clearable
              class="mx-4 mt-2"
              @click:append="show.new = !show.new"
            ></v-text-field>
          </v-form>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="deep-purple accent-4"
              @click="dialog.password = false"
            >
              取消操作
            </v-btn>
            <v-btn
              text
              color="deep-purple accent-4"
              :disabled="!valid.password"
              :loading="loading"
              @click="sendPassword"
            >
              确认修改
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog.delete" width="372">
        <template v-slot:activator="{ on, attrs }">
          <v-list-item link v-bind="attrs" v-on="on">
            <v-list-item-icon>
              <v-icon color="red accent-4">mdi-delete-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content class="red--text accent-4">
              <v-list-item-title>删除账号</v-list-item-title>
              <v-list-item-subtitle>清空关于你的所有数据</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-card>
          <v-card-title>删除账号</v-card-title>
          <v-card-text>删除账号的操作不可逆！</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="red accent-4"
              :loading="loading"
              @click="sendDelete"
            >
              确认删除
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-list>
    <v-snackbar id="snackbar" v-model="snackbar" bottom class="mb-8">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn text color="primary" v-bind="attrs" @click="snackbar = false">
          关闭
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import OSS from 'ali-oss'

import drawerItem from '../components/drawer'
export default {
  middleware: ['fetch'],
  components: {
    'v-drawer': drawerItem,
  },
  data() {
    return {
      drawer: false,
      dialog: {
        avatar: false,
        name: false,
        bio: false,
        location: false,
        password: false,
        delete: false,
      },
      password: {
        old: '',
        new: '',
      },
      show: {
        old: false,
        new: false,
      },
      valid: {
        name: false,
        bio: false,
        location: false,
        password: false,
      },
      snackbar: false,
      timeout: 2000,
      text: '',
      image: '',
      user: {
        id:
          this.$store.state.localStorage.userData.id ||
          this.$store.state.localStorage.default.userData.id,
        avatar:
          this.$store.state.localStorage.userData.avatar ||
          this.$store.state.localStorage.default.userData.avatar,
        name:
          this.$store.state.localStorage.userData.name ||
          this.$store.state.localStorage.default.userData.name,
        bio:
          this.$store.state.localStorage.userData.bio ||
          this.$store.state.localStorage.default.userData.bio,
        location:
          this.$store.state.localStorage.userData.location ||
          this.$store.state.localStorage.default.userData.location,
        phone:
          this.$store.state.localStorage.userData.phone ||
          this.$store.state.localStorage.default.userData.phone,
      },
      input: {
        avatar: '',
        name: '',
        bio: '',
        location: '',
      },
      rules: {
        avatar: [
          (v) =>
            !v || v.size < 2000000 || 'Avatar size should be less than 2 MB!',
        ],
        name: [
          (v) => !!v || '名字为必填项',
          (v) => (v && v.length <= 24) || '最多 24 个字符',
        ],
        bio: [
          (v) => !!v || '个性签名为必填项',
          (v) => (v && v.length <= 100) || '最多 100 个字符',
        ],
        location: [
          (v) => !!v || '位置为必填项',
          (v) => (v && v.length <= 24) || '最多 24 个字符',
        ],
        password: [
          (v) => !!v || '密码为必填项',
          (v) => (v && v.length) >= 8 || '最少 8 个字符',
          (v) => (v && v.length) <= 24 || '最多 24 个字符',
          (v) =>
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,24}$/.test(
              v
            ) || '密码不符合要求',
        ],
        confirm: [
          (v) => !!v || '密码为必填项',
          (v) => (v && v.length) >= 8 || '最少 8 个字符',
          (v) => (v && v.length) <= 24 || '最多 24 个字符',
          (v) =>
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,24}$/.test(
              v
            ) || '密码不符合要求',
          (v) => v !== this.password.old || '新旧密码不能相同',
        ],
      },
      loading: false,
    }
  },
  methods: {
    async uploadAvatar() {
      try {
        const keys = await this.$axios.$get(
          'https://test.lifeni.life/sts?id=' + this.user.id,
          { withCredentials: true, credentials: 'include' }
        )

        const input = document.querySelector('#file-input')
        await input.click()

        input.addEventListener('change', async () => {
          const files = input.files

          if (files[0].size > 1 * 1024 * 1024) {
            this.snackbar = true
            this.text = '图片超过 1 MB，不能上传'
          } else if (
            !files[0].type.includes('png') &&
            !files[0].type.includes('jpg') &&
            !files[0].type.includes('jpeg') &&
            !files[0].type.includes('webp') &&
            !files[0].type.includes('gif')
          ) {
            this.snackbar = true
            this.text = '图片格式不对'
          } else {
            const fileName = `avatar-${this.user.id}-${new Date().getTime()}.${
              files[0].type.split('/')[1]
            }`
            const client = new OSS(keys.data)
            await client
              .put('chatcat/' + fileName, files[0])
              .then((result) => {
                this.input.avatar = result.url
                this.$store.commit('localStorage/setUserData', this.user)
              })
              .then(async () => {
                const reader = new FileReader()
                await reader.readAsDataURL(files[0])
                reader.onload = (e) => {
                  this.image = e.target.result
                }
              })
              .catch((err) => {
                console.log(err)
                this.snackbar = true
                this.text = '上传图片失败'
              })
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    async sendAvatar() {
      this.loading = true
      await this.$axios
        .$post('https://test.lifeni.life/api/update', {
          avatar: this.input.avatar,
        })
        .then((res) => {
          this.loading = false
          if (res.code === 0) {
            this.user.avatar = this.input.avatar
            this.input.avatar = ''
            this.snackbar = true
            this.text = `头像修改成功`
            this.dialog.avatar = false
            this.$store.commit('localStorage/setUserData', this.user)
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
    async sendName(e) {
      e.preventDefault()
      this.loading = true
      await this.$axios
        .$post('https://test.lifeni.life/api/update', {
          name: this.input.name,
        })
        .then((res) => {
          this.loading = false
          if (res.code === 0) {
            this.user.name = this.input.name
            this.input.name = ''
            this.snackbar = true
            this.text = `名字修改成功：${this.input.name}`
            this.dialog.name = false
            this.$store.commit('localStorage/setUserData', this.user)
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
    async sendBio(e) {
      e.preventDefault()
      this.loading = true
      await this.$axios
        .$post('https://test.lifeni.life/api/update', {
          bio: this.input.bio,
        })
        .then((res) => {
          this.loading = false
          if (res.code === 0) {
            this.user.bio = this.input.bio
            this.input.bio = ''
            this.snackbar = true
            this.text = `个性签名修改成功：${this.input.bio}`
            this.dialog.bio = false
            this.$store.commit('localStorage/setUserData', this.user)
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
    async sendLocation(e) {
      e.preventDefault()
      this.loading = true
      await this.$axios
        .$post('https://test.lifeni.life/api/update', {
          address: this.input.location,
        })
        .then((res) => {
          this.loading = false
          if (res.code === 0) {
            this.user.location = this.input.location
            this.input.location = ''
            this.snackbar = true
            this.text = `位置修改成功：${this.input.location}`
            this.dialog.location = false
            this.$store.commit('localStorage/setUserData', this.user)
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
    async sendPassword() {
      this.loading = true
      await this.$axios
        .$post('https://test.lifeni.life/api/resetpwd2', {
          oldpwd: this.password.old,
          newpwd: this.password.new,
        })
        .then((res) => {
          this.loading = false
          if (res.code === 0) {
            this.snackbar = true
            this.text = `密码修改成功`
            this.dialog.password = false
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
    async sendDelete() {
      this.loading = true
      await this.$axios
        .$post('https://test.lifeni.life/api/delete', {})
        .then((res) => {
          this.loading = false
          if (res.code === 0) {
            this.snackbar = true
            this.text = `删除账号成功，即将跳转到首页`
            this.dialog.delete = false
            setTimeout(() => {
              this.$router.push({ path: '/welcome' })
            }, 2000)
          } else {
            this.dialog.delete = false
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
  },
}
</script>

<style scoped>
.avatar {
  box-shadow: 0 0 48px rgba(0, 0, 0, 0.1);
}

.danger {
  color: red;
}

.upload {
  margin: 0 auto;
  border-radius: 100px;
}
</style>
