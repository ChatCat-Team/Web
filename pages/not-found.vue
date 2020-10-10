<template>
  <div style="position: relative; height: 100vh">
    <div
      class="d-flex flex-column align-center justify-center pa-4"
      style="height: 100%; min-height: 100vh"
    >
      <v-card
        elevation="0"
        class="grey full-width lighten-4 d-flex flex-column align-start justify-space-between"
      >
        <v-card-subtitle> Not Found </v-card-subtitle>
        <v-card-title> 找不到房间 {{ id || '' }} </v-card-title>
        <v-card-subtitle>
          请检查输入的房间号是否正确，可以在下面的搜索框中重新搜索，或者点击下面的按钮回到主页
        </v-card-subtitle>
        <v-card-actions>
          <v-btn color="primary" text>
            <NuxtLink to="/" class="text-decoration-none"> 返回主页 </NuxtLink>
          </v-btn>
        </v-card-actions>
      </v-card>
      <div class="d-flex flex-column full-width mt-4">
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
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ query }) {
    console.log(query)
    return {
      id: query.id,
    }
  },
  validate({ query }) {
    return /^\d+$/.test(query.id)
  },
  data: () => ({
    search: '',
  }),
  methods: {
    goToLink() {
      if (this.search) {
        this.$router.push({ path: `/room/${this.search}` })
      }
    },
  },
}
</script>
