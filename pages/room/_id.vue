<template>
  <div style="position: relative; height: 100vh">
    <v-app-bar flat color="white" style="z-index: 1000">
      <v-btn icon>
        <NuxtLink to="/" class="text-decoration-none">
          <v-icon color="grey darken-2">mdi-arrow-left</v-icon>
        </NuxtLink>
      </v-btn>
      <v-toolbar-title> {{ meta.title }} </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-chip color="grey lighten-4" style="min-width: 32px">
        {{ meta.id }}
      </v-chip>
    </v-app-bar>
    <v-sheet
      id="box"
      class="window px-4 d-flex flex-column align-center justify-start"
    >
      <v-card
        v-if="card"
        elevation="0"
        class="grey my-4 full-width lighten-4 d-flex flex-column align-start justify-space-between"
      >
        <v-card-subtitle> #{{ meta.id || 'XXX' }} </v-card-subtitle>
        <v-card-title> 欢迎来到 {{ meta.title || '聊天室' }} </v-card-title>
        <v-card-subtitle>
          由 {{ meta.creatername || '匿名用户' }} 创建
        </v-card-subtitle>
        <v-card-text v-show="meta.description">
          {{ meta.description || '没有描述信息' }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="card = false"> 知道了 </v-btn>
        </v-card-actions>
      </v-card>
      <p
        v-show="messages.length === 0"
        class="text-body-1 grey--text lighten-2 ma-4"
      >
        目前没有消息
      </p>
      <v-list v-show="messages.length !== 0" two-line class="full-width">
        <template v-for="(message, index) in messages">
          <v-list-item v-if="message.self" :key="index" ripple>
            <v-list-item-content>
              <v-list-item-title class="content">
                {{ message.messageContent }}
              </v-list-item-title>
              <v-list-item-subtitle class="py-1">
                {{ message.name }}
                {{ message.date }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar color="grey lighten-4">
              <v-img :src="message.avatar"></v-img>
            </v-list-item-avatar>
          </v-list-item>
          <v-list-item v-else :key="index" ripple>
            <v-list-item-avatar color="grey lighten-4">
              <v-img :src="message.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="content">
                {{ message.messageContent }}
              </v-list-item-title>
              <v-list-item-subtitle class="py-1">
                {{ message.name }}
                {{ message.date }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-sheet>
    <div class="bar white pa-4 full-width">
      <v-text-field
        v-model="input"
        solo
        flat
        background-color="grey lighten-4"
        hide-details
        label="在此输入消息"
        single-line
        type="text"
        class="fix-margin"
      >
        <template v-slot:append-outer>
          <client-only>
            <v-btn
              v-show="input"
              rounded
              color="primary"
              elevation="0"
              width="48"
              height="48"
              min-width="48"
              :disabled="!input"
              class="ml-4"
              @keypress.enter="!input && sendMessage"
              @click="sendMessage"
            >
              <v-icon>mdi-send-outline</v-icon>
            </v-btn>
          </client-only>
        </template>
      </v-text-field>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import calendar from 'dayjs/plugin/calendar'
dayjs.extend(calendar)
dayjs.locale('zh-cn')

export default {
  middleware: ['check'],
  asyncData({ params }) {
    return {
      id: params.id,
    }
  },
  data: () => ({
    drawer: false,
    meta: {},
    messages: [],
    members: [],
    input: '',
    ws: null,
    card: true,
  }),
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  methods: {
    async sendMessage() {
      await this.ws.send(
        JSON.stringify({
          messageContent: this.input,
          messageType: 'ChatMessage',
        })
      )
    },
  },
  mounted() {
    this.meta =
      this.$store.state.sessionStorage.roomData ||
      this.$store.state.sessionStorage.default.roomData

    const box = document.querySelector('#box')

    this.$nextTick(() => {
      box.scrollTop = box.scrollHeight // 滚动高度
    })

    const user = this.$store.state.localStorage.userData.id
    const url = `wss://test.lifeni.life/chat/websocket/chatroom/${
      this.id || '0'
    }/${user || '0'}`
    this.ws = new WebSocket(url)

    this.ws.onopen = () => {
      this.status = 1
      console.log('连接已打开')
      this.ws.send(
        JSON.stringify({
          code: 0,
          msg: `房间 ${this.id} 用户 ${user} 已连接`,
        })
      )
    }

    this.ws.onmessage = (e) => {
      console.log(e.data)
      const data = JSON.parse(e.data)
      if (data.code === 0) {
        if (data.extend.message.messageType === 'messageType') {
          const message = data.extend.message
          const user = this.members.find((m) => m.id === message.from)
          message.avatar = user.avatar
          message.name = user.name
          message.time = dayjs(message.date).calendar(null, {
            sameDay: '[今天] h:mm A', // The same day ( Today at 2:30 AM )
            nextDay: '[明天] h:mm A', // The next day ( Tomorrow at 2:30 AM )
            nextWeek: 'dddd h:mm A', // The next week ( Sunday at 2:30 AM )
            lastDay: '[昨天] h:mm A', // The day before ( Yesterday at 2:30 AM )
            lastWeek: '[上周] dddd h:mm A', // Last week ( Last Monday at 2:30 AM )
            sameElse: 'YYYY/MM/DD h:mm A', // Everything else ( 17/10/2011 )
          })
          message.self = this.message.from === user
          this.messages.push(message)

          this.$nextTick(() => {
            box.scrollTop = box.scrollHeight // 滚动高度
          })
        } else if (data.extend.message.messageType === 'SystemNotify') {
          this.members = data.extend.message.messageContent
        }
      } else {
        this.snackbar = true
        this.text = '获取数据失败'
      }
    }

    this.ws.onclose = () => {
      this.status = 0
      console.log('连接已关闭')
    }

    this.ws.onerror = (err) => {
      this.status = -1
      console.error('连接出错', url, err)
    }
  },
}
</script>

<style scoped>
.window {
  height: calc(100vh - 32px - 56px - 56px);
  overflow-y: auto;
}
.bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: 420px;
}

.content {
  line-height: 1.5 !important;
  overflow: unset;
  white-space: unset;
  text-emphasis: unset;
}
</style>
