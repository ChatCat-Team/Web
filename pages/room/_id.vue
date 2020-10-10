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
      <v-chip color="grey lighten-4" style="min-width: 32px">{{
        meta.id
      }}</v-chip>
    </v-app-bar>
    <v-sheet class="window px-4 d-flex flex-column align-center justify-start">
      <v-card
        ripple
        elevation="0"
        class="grey my-4 full-width lighten-4 d-flex flex-column align-start justify-space-between"
      >
        <v-card-subtitle> #{{ meta.id || 'XXX' }} </v-card-subtitle>
        <v-card-title> 欢迎来到 {{ meta.title || '聊天室' }} </v-card-title>
        <v-card-subtitle> 由 隔壁老王 在 两天前 创建 </v-card-subtitle>
        <v-card-text v-show="meta.description">
          {{ meta.description || '没有描述信息' }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="deep-purple lighten-2" text> 知道了 </v-btn>
        </v-card-actions>
      </v-card>
      <p
        v-show="messages.length === 0"
        class="text-body-1 grey--text lighten-2 ma-0"
      >
        目前没有消息
      </p>
      <v-list v-show="messages.length !== 0" three-line>
        <template v-for="(message, index) in messages">
          <v-list-item :key="index">
            <v-list-item-avatar>
              <v-img></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title></v-list-item-title>
              <v-list-item-subtitle></v-list-item-subtitle>
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
          >
            <v-icon>mdi-send-outline</v-icon>
          </v-btn>
        </template>
        <!-- <template v-slot:prepend>
          <v-btn
            rounded
            color="secondary"
            elevation="0"
            width="48"
            height="48"
            min-width="48"
            class="mr-4"
          >
            <v-icon>mdi-image-outline</v-icon>
          </v-btn>
        </template> -->
      </v-text-field>
    </div>
  </div>
</template>

<script>
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
  }),
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  mounted() {
    this.meta =
      this.$store.state.sessionStorage.roomData ||
      this.$store.state.sessionStorage.default.roomData

    const user = this.$store.state.localStorage.userData.id
    const url = `wss://test.lifeni.life/chat/websocket/chatroom/${this.id}/${user}`
    const ws = new WebSocket(url)

    ws.onopen = () => {
      this.status = 1
      console.log('连接已打开')
      ws.send(
        JSON.stringify({
          code: 0,
          msg: `房间 ${this.id} 用户 ${user} 已连接`,
        })
      )
    }

    ws.onmessage = (e) => {
      console.log(e.data)
      if (e.data.code === 0) {
        if (e.data.extend.message.messageType === 'messageType') {
          this.messages.push(e.data.extend.message)
        } else if (e.data.extend.message.messageType === 'SystemNotify') {
          this.members = e.data.extend.message.messageContent
        }
      } else {
        this.snackbar = true
        this.text = '获取数据失败'
      }
    }

    ws.onclose = () => {
      this.status = 0
      console.log('连接已关闭')
    }

    ws.onerror = (err) => {
      this.status = -1
      console.error('连接出错', url, err)
    }
  },
  method: {
    async sendMessage() {},
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
</style>
