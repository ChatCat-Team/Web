<template>
  <div style="position: relative; min-height: calc(100vh - 32px)">
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
      <v-drawer></v-drawer>
    </v-navigation-drawer>

    <v-list two-line class="ma-4">
      <v-dialog v-model="dialog.avatar" width="372" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-list-item link class="mb-8" v-bind="attrs" v-on="on">
            <v-avatar class="avatar my-4 mx-auto" size="240">
              <v-img
                :src="user.avatar || '/default_avatar.png'"
                alt="用户头像"
              ></v-img>
            </v-avatar>
          </v-list-item>
        </template>
        <v-card>
          <v-card-title>修改头像</v-card-title>
          <v-file-input
            :rules="rules.avatar"
            accept="image/png, image/jpeg, image/bmp, image/webp"
            placeholder="选择一个图片"
            prepend-icon=""
            hide-input
            label="Avatar"
            class="mx-4 mt-4 mb-12 d-flex justify-space-around"
          >
            <template v-slot:append-outer>
              <v-btn
                rounded
                elevation="0"
                width="100"
                height="100"
                class="upload mx-4"
              >
                <v-icon x-large>mdi-camera-outline</v-icon>
              </v-btn>

              <v-btn
                rounded
                elevation="0"
                width="100"
                height="100"
                class="upload mx-4"
              >
                <v-icon x-large>mdi-cancel</v-icon>
              </v-btn>
            </template>
          </v-file-input>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="deep-purple accent-4"
              @click="
                dialog.avatar = false
                user.avatar =
                  $store.state.localStorage.userData.avatar ||
                  $store.state.localStorage.default.userData.avatar
              "
            >
              取消操作
            </v-btn>
            <v-btn
              text
              color="deep-purple accent-4"
              :disabled="
                ($store.state.localStorage.userData.avatar ||
                  $store.state.localStorage.default.userData.avatar) ===
                  user.avatar ||
                user.avatar === null ||
                user.avatar === ''
                  ? ''
                  : false
              "
              @click="dialog.avatar = false"
            >
              确认上传
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
          <v-card-title>修改名字</v-card-title>
          <v-text-field
            v-model="user.name"
            :placeholder="$store.state.localStorage.default.userData.name"
            filled
            clearable
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
                user.name = $store.state.localStorage.default.userData.name
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
                user.name =
                  $store.state.localStorage.userData.name ||
                  $store.state.localStorage.default.userData.name
              "
            >
              取消操作
            </v-btn>
            <v-btn
              text
              color="deep-purple accent-4"
              :disabled="
                ($store.state.localStorage.userData.name ||
                  $store.state.localStorage.default.userData.name) ===
                  user.name ||
                user.name === null ||
                user.name === ''
                  ? ''
                  : false
              "
              @click="dialog.name = false"
            >
              确认修改
            </v-btn>
          </v-card-actions>
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
          <v-card-title>修改个性签名</v-card-title>
          <v-textarea
            v-model="user.bio"
            :placeholder="$store.state.localStorage.default.userData.bio"
            filled
            clearable
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
              @click="user.bio = $store.state.localStorage.default.userData.bio"
            >
              恢复默认
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="deep-purple accent-4"
              @click="
                dialog.bio = false
                user.bio =
                  $store.state.localStorage.userData.bio ||
                  $store.state.localStorage.default.userData.bio
              "
            >
              取消操作
            </v-btn>
            <v-btn
              text
              color="deep-purple accent-4"
              :disabled="
                ($store.state.localStorage.userData.bio ||
                  $store.state.localStorage.default.userData.bio) ===
                  user.bio ||
                user.bio === null ||
                user.bio === ''
                  ? ''
                  : false
              "
              @click="dialog.bio = false"
            >
              确认修改
            </v-btn>
          </v-card-actions>
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
          <v-card-title>修改位置</v-card-title>
          <v-text-field
            v-model="user.location"
            :placeholder="$store.state.localStorage.default.userData.location"
            filled
            clearable
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
                user.location =
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
                user.location =
                  $store.state.localStorage.userData.location ||
                  $store.state.localStorage.default.userData.location
              "
            >
              取消操作
            </v-btn>
            <v-btn
              text
              color="deep-purple accent-4"
              :disabled="
                ($store.state.localStorage.userData.location ||
                  $store.state.localStorage.default.userData.location) ===
                  user.location ||
                user.location === null ||
                user.location === ''
                  ? ''
                  : false
              "
              @click="dialog.location = false"
            >
              确认修改
            </v-btn>
          </v-card-actions>
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
          <v-text-field
            v-model="password.old"
            :append-icon="show.old ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show.old ? 'text' : 'password'"
            :rules="rules.password"
            label="旧的密码"
            prepend-inner-icon="mdi-form-textbox-password"
            hint="新旧密码必须不同"
            persistent-hint
            required
            filled
            counter="24"
            clearable
            class="mx-4 mt-2"
            @click:append="show.old = !show.old"
          ></v-text-field>
          <v-text-field
            v-model="password.new"
            :append-icon="show.new ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show.new ? 'text' : 'password'"
            :rules="rules.password"
            label="新的密码"
            prepend-inner-icon="mdi-form-textbox-password"
            hint="8 - 24 个字符，且包含字母、数字、符号"
            persistent-hint
            required
            filled
            counter="24"
            clearable
            class="mx-4 mt-2"
            @click:append="show.new = !show.new"
          ></v-text-field>
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
              @click="dialog.password = false"
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
            <v-btn text color="red accent-4" @click="dialog.delete = false">
              确认删除
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-list>
  </div>
</template>

<script>
import drawerItem from '../components/drawer'
export default {
  layout: 'default',
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
      user: {
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
          (v) => v.length >= 8 || '最少 8 个字符',
          (v) => v.length <= 24 || '最多 24 个字符',
        ],
      },
    }
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
