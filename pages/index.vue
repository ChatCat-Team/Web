<template>
  <div style="position: relative; min-height: 100vh">
    <v-app-bar
      flat
      color="white"
      elevation="0"
      prominent
      height="280"
      extended
      extension-height="56px"
    >
      <v-app-bar-nav-icon
        id="button-menu"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-h5 my-8">
        {{ getHello() }}，{{
          $store.state.localStorage.userData.name ||
          $store.state.localStorage.default.userData.name + '用户'
        }}
        <br />
        <span
          v-if="status === -1"
          class="text-subtitle-1 my-2 status point-error"
        >
          连接服务器出现错误
        </span>
        <span
          v-if="status === 0"
          class="text-subtitle-1 my-2 status point-null"
        >
          未连接到服务器
        </span>
        <span
          v-if="status === 1"
          class="text-subtitle-1 my-2 status point-success"
        >
          已连接到服务器
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-chip class="my-2" color="grey lighten-4">演示版本</v-chip>
      <template v-slot:extension>
        <div class="d-flex flex-column full-width">
          <v-text-field
            v-model="search"
            solo
            flat
            height="56"
            background-color="grey lighten-4"
            clearable
            full-width
            type="number"
            label="输入 ID 加入一个聊天室"
            prepend-inner-icon="mdi-magnify"
            hide-details
            class="full-width"
            @keypress.enter="goToLink"
          >
          </v-text-field>
        </div>
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-drawer v-if="drawer"></v-drawer>
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
            elevation="0"
            class="fab"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-toolbar flat>
            <v-btn icon @click="dialog.new = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-title>创建新的聊天室</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              icon
              type="submit"
              :loading="loading"
              :disabled="!valid.create"
              @click="sendNewRoom"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-toolbar>
          <v-form
            v-model="valid.create"
            class="pa-4 pt-2 d-flex flex-column align-center"
          >
            <v-text-field
              id="input-room-title"
              v-model="create.title"
              type="text"
              label="房间标题"
              hint="默认公开。不能超过 20 个字符"
              persistent-hint
              prepend-inner-icon="mdi-format-header-pound"
              required
              solo
              flat
              autofocus
              aria-required
              :rules="rules.title"
              height="56"
              background-color="grey lighten-4"
              counter="20"
              clearable
              class="full-width"
            ></v-text-field>
            <v-textarea
              v-model="create.description"
              solo
              flat
              background-color="grey lighten-4"
              clearable
              auto-grow
              full-width
              :rules="rules.description"
              counter="100"
              label="描述房间的信息（可选）"
              hint="最多 100 个字符"
              persistent-hint
              prepend-inner-icon="mdi-text-box-outline"
              class="full-width"
            ></v-textarea>
          </v-form>
        </v-card>
      </v-dialog>

      <div class="board d-flex flex-row flex-wrap pa-2">
        <p
          v-show="rooms.length === 0"
          class="text-body-1 full-width text-center grey--text lighten-2 ma-0"
          style="padding: calc(50vh - 220px) 0"
        >
          目前没有聊天室
        </p>
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
              <p class="text-caption font-weight-light ma-0 px-4 pt-4 pb-1">
                <span class="font-weight-medium">{{ room.creatername }}</span>
                在
                <span class="font-weight-medium">{{
                  fromNow(Number(room.starttimeunix))
                }}</span>
                创建
              </p>
              <v-card-title
                class="text-h6 font-weight-medium py-0"
                :title="room.description"
                >{{ room.title }}</v-card-title
              >
            </div>
            <p
              v-if="room.status === 1"
              class="text-body-2 pt-0 px-4 d-flex align-center status point-waiting font-weight-medium"
            >
              等待加入
            </p>
            <p
              v-else-if="room.status === 2"
              class="text-body-2 pt-0 px-4 d-flex align-center status point-success font-weight-medium"
            >
              正在进行，{{ room.userOnlineNumber }} 人在线
            </p>
            <p
              v-else-if="room.status === 3"
              class="text-body-2 pt-0 px-4 d-flex align-center status point-null font-weight-medium"
            >
              当前空闲
            </p>
            <p
              v-else-if="room.status === 4"
              class="text-body-2 pt-0 px-4 d-flex align-center status point-error font-weight-medium"
            >
              房间异常
            </p>
          </v-card>
        </NuxtLink>
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
          <v-btn text color="primary" v-bind="attrs" @click="snackbar = false">
            关闭
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import drawerItem from '../components/drawer'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

export default {
  middleware: ['fetch'],
  components: {
    'v-drawer': drawerItem,
  },
  data: () => ({
    drawer: false,
    fromNow: (d) => dayjs(d).fromNow(),
    count: 5,
    search: '',
    dialog: {
      new: false,
    },
    valid: {
      create: false,
    },
    create: {
      title: '',
      description: '',
      password: '',
    },
    status: 0,
    snackbar: false,
    timeout: 2000,
    text: '',
    show: {
      password: false,
    },
    rooms: [],
    rules: {
      title: [
        (v) => !!v || '标题为必填项',
        (v) => (v && v.length <= 20) || '最多 20 个字符',
      ],
      description: [
        (v) =>
          (v !== undefined && v !== null && v.length <= 100) ||
          '最多 100 个字符',
      ],
      code: [(v) => (v && v.length === 4) || '密码为 4 个字符'],
    },
    records: ['这里', '显示的是', '曾经加入过的', '房间名', '默认开启'],
    user: {
      avatar: null,
      bio: null,
      location: null,
      name: null,
      phone: 'XXX XXXX XXXX',
    },
    loading: false,
    ws: null,
    ping: null,
  }),
  mounted() {
    const id = this.$store.state.localStorage.userData.id
    const url = `wss://test.lifeni.life/chat/websocket/home/${id}`
    this.ws = new WebSocket(url)

    this.ws.onopen = (e) => {
      this.status = 1
      console.log('连接已打开', e)
      this.ping = setInterval(() => {
        this.ws.send(JSON.stringify('ping'))
      }, 30000)
      this.ws.send(
        JSON.stringify({
          code: 0,
          msg: `用户 ${id} 已连接`,
        })
      )
    }

    this.ws.onmessage = (e) => {
      const data = JSON.parse(e.data)
      console.log(data)
      if (data === 'pong') {
        console.log('ping-pong')
      } else if (data.code === 0) {
        const array = data.extend.message.messageContent
        array.sort((a, b) => a.starttimeunix < b.starttimeunix)
        this.rooms = array
      } else {
        this.snackbar = true
        this.text = '获取数据失败'
      }
    }

    this.ws.onclose = (e) => {
      this.status = 0
      console.log('连接已关闭', e)
    }

    this.ws.onerror = (err) => {
      this.status = -1
      console.error('连接出错', url, err)
    }
  },
  destroyed() {
    this.ws.close()
    clearInterval(this.ping)
  },
  methods: {
    getHello() {
      const hour = new Date().getHours()
      if (hour >= 6 && hour < 9) {
        return '早上好'
      } else if (hour >= 9 && hour < 11) {
        return '上午好'
      } else if (hour >= 11 && hour < 14) {
        return '中午好'
      } else if (hour >= 14 && hour < 19) {
        return '下午好'
      } else if (hour >= 19 || hour < 6) {
        return '晚上好'
      }
    },
    goToLink() {
      if (this.search) {
        this.$router.push({ path: `/room/${this.search}` })
      }
    },
    async sendNewRoom(e) {
      e.preventDefault()
      this.loading = true
      await this.$axios
        .$post('https://test.lifeni.life/chat/chatroom/createChatRoom', {
          title: this.create.title,
          description: this.create.description,
          // code: this.create.code,
        })
        .then((res) => {
          this.loading = false
          if (res.code === 0) {
            this.$router.push({ path: `/room/${res.extend.roomid}` })
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
  },
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

.status {
  display: flex;
  flex-direction: row;
  align-items: center;
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

.status.point-success::before {
  background-color: #69c667;
}

.status.point-waiting::before {
  background-color: #4fc3f7;
}

.status.point-error::before {
  background-color: #ff8a65;
}

.status.point-null::before {
  background-color: #bdbdbd;
}
</style>
