<template>
  <div style="position: relative; min-height: calc(100vh - 32px)">
    <v-app-bar flat dark elevation="0" extended extension-height="212px">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-h6">ChatCat</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-slot:extension>
        <div class="d-flex flex-column full-width">
          <v-text-field
            solo
            height="56px"
            flat
            clearable
            full-width
            type="text"
            label="加入一个聊天室"
            prepend-inner-icon="mdi-magnify"
            append-icon="mdi-qrcode"
            hint="当前为演示版本，不代表最终效果"
            persistent-hint
            class="pb-2 full-width"
          >
          </v-text-field>

          <v-chip-group
            v-show="
              ($store.state.localStorage.settings.enableSearchHistory ||
                $store.state.localStorage.default.settings
                  .enableSearchHistory) === 'enable'
            "
            class="pb-4 full-width"
            column
            active-class="primary--text"
          >
            <v-chip color="grey darken-3"> 历史搜索记录 </v-chip>
            <v-chip
              v-for="(record, i) in records"
              :key="i"
              close
              close-icon="mdi-close"
              color="grey darken-3"
            >
              {{ record }}
            </v-chip>
          </v-chip-group>
        </div>
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-drawer></v-drawer>
    </v-navigation-drawer>

    <v-main id="attach">
      <v-dialog v-model="dialog.new" class="dialog" width="372" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fixed
            dark
            fab
            large
            color="primary"
            class="fab"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card class="mt-12">
          <v-toolbar dark flat>
            <v-btn icon dark @click="dialog.new = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-title>创建新的聊天室</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog.new = false">
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-toolbar>
          <v-form class="pa-6 d-flex flex-column align-center">
            <v-text-field
              id="input-room-title"
              v-model="create.title"
              type="text"
              label="房间标题"
              hint="默认公开。不能超过 24 个字符"
              persistent-hint
              prepend-inner-icon="mdi-format-header-pound"
              required
              filled
              counter="24"
              clearable
              class="full-width"
            ></v-text-field>
            <v-textarea
              v-model="create.description"
              filled
              clearable
              auto-grow
              full-width
              counter="100"
              label="描述房间的信息（可选）"
              hint="最多 100 个字符"
              persistent-hint
              prepend-inner-icon="mdi-text-box-outline"
              class="full-width"
            ></v-textarea>
            <v-text-field
              id="input-password"
              v-model="create.password"
              :append-icon="show.password ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show.password ? 'text' : 'password'"
              label="房间密码（可选）"
              prepend-inner-icon="mdi-form-textbox-password"
              hint="4 个字符的数字"
              persistent-hint
              filled
              counter="4"
              clearable
              class="full-width"
              @click:append="show.password = !show.password"
            ></v-text-field>
          </v-form>
        </v-card>
      </v-dialog>

      <div class="board d-flex flex-row flex-wrap pa-2">
        <NuxtLink
          v-for="(room, i) in rooms"
          :key="i"
          :to="`/room/${room.id}`"
          class="card d-flex text-decoration-none"
        >
          <v-card
            ripple
            elevation="0"
            nuxt
            class="grey full-width lighten-4 d-flex flex-column align-start justify-space-between"
          >
            <div class="full-width">
              <p class="text-caption ma-0 px-4 pt-4 pb-1">
                <strong>{{ room.creator }}</strong> 在
                <strong>{{ fromNow(room.date) }}</strong> 创建
              </p>
              <v-card-title class="text-h6 font-weight-bold py-0">{{
                room.title
              }}</v-card-title>
            </div>
            <p
              :class="`text-body-2 pt-0 px-4 d-flex align-center status ${
                room.status.code === 0
                  ? 'waiting font-weight-bold'
                  : room.status.code === 1
                  ? 'online font-weight-bold'
                  : 'offline'
              }`"
            >
              {{
                room.status.code === 0
                  ? '等待加入'
                  : room.status.code === 1
                  ? `${room.status.count} 人在线`
                  : '已结束'
              }}
            </p>
          </v-card>
        </NuxtLink>
      </div>
    </v-main>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import axios from 'axios'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import drawerItem from '../components/drawer'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

export default {
  layout: 'default',
  components: {
    'v-drawer': drawerItem,
  },
  async fetch({ store, params, redirect }) {
    await axios.get('https://test.lifeni.life/api/user').then(async (res) => {
      if (res.data.code === 0) {
        console.log(res)
        await store.commit('localStorage/setUserData', res.data.extend.user)
      } else {
        console.log('redirect to welcome')
        // redirect('/welcome')
      }
    })
  },
  data: () => ({
    drawer: false,
    fromNow: (d) => dayjs.unix(d).fromNow(),
    dialog: {
      new: false,
    },
    create: {
      title: '',
      description: '',
      password: '',
    },
    show: {
      password: false,
    },
    rooms: [
      {
        id: 454781,
        title: '测试一下',
        creator: '小白',
        date: '1600694209',
        status: {
          code: 1,
          count: 45,
        },
      },
      {
        id: 57471,
        title: '这是一个长长长长长长标题',
        creator: '隔壁老王',
        date: '1600692209',
        status: {
          code: 2,
        },
      },
      {
        id: 5381,
        title: '这是一个标题',
        creator: '老黑',
        date: '1600694109',
        status: {
          code: 0,
        },
      },
      {
        id: 781,
        title: '讨论一下关于今天早上吃什么的问题',
        creator: '匿名',
        date: '1600634209',
        status: {
          code: 1,
          count: 3,
        },
      },
      {
        id: 387954,
        title: '前后端对接讨论',
        creator: '张三',
        date: '1600694009',
        status: {
          code: 2,
        },
      },
    ],
    records: ['搜索', '可以输入', '房间号', '房间名', '💩', '都 👌'],
    user: {
      avatar: null,
      bio: null,
      location: null,
      name: null,
      phone: 'XXX XXXX XXXX',
    },
  }),
}
</script>

<style scoped>
.card {
  width: calc(50% - 16px);
  height: 200px;
  margin: 8px;
}

.fab {
  left: calc(50% - 32px);
  bottom: 32px;
}

.creator {
  padding: 0 16px;
}

.status::before {
  content: '';
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin-right: 12px;
  border-radius: 1rem;
  background-color: #ffffff;
}

.status.online::before {
  background-color: #69c667;
}

.status.waiting::before {
  background-color: #4fc3f7;
}

.status.offline::before {
  background-color: #bdbdbd;
}
</style>
