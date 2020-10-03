<template>
  <div style="position: relative; min-height: 100vh">
    <v-app-bar flat elevation="0" color="white">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-h6">设置</v-toolbar-title>
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
    <v-list subheader two-line flat class="py-4">
      <v-subheader class="px-6">外观</v-subheader>
      <v-list-item-group>
        <v-dialog v-model="dialog.color" width="300">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item ripple v-bind="attrs" v-on="on">
              <v-list-item-icon>
                <v-icon>mdi-palette-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>主题颜色</v-list-item-title>
                <v-list-item-subtitle>选择应用的主题颜色</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-card>
            <v-color-picker
              v-model="settings.color"
              flat
              width="372"
            ></v-color-picker>
            <v-card-actions>
              <v-btn
                text
                color="deep-purple accent-4"
                @click="
                  settings.color =
                    $store.state.localStorage.default.settings.themeColor
                "
              >
                恢复默认
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                text
                color="deep-purple accent-4"
                :disabled="
                  equal(
                    $store.state.localStorage.settings.themeColor ||
                      $store.state.localStorage.default.settings.themeColor,
                    settings.color
                  )
                    ? ''
                    : false
                "
                @click="setThemeColor"
              >
                应用主题颜色
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog.font" width="372">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item ripple v-bind="attrs" v-on="on">
              <v-list-item-icon>
                <v-icon>mdi-format-text-variant-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>字体大小</v-list-item-title>
                <v-list-item-subtitle
                  >所有字体会按照这个设定进行缩放</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-card>
            <v-card-title>设置字体大小</v-card-title>
            <v-slider
              v-model="settings.font"
              step="2"
              max="20"
              min="12"
              thumb-label="always"
              ticks
              append-icon="mdi-format-font-size-increase"
              prepend-icon="mdi-format-font-size-decrease"
              color="deep-purple accent-4"
              track-color="deep-purple accent-1"
              class="pt-12 px-6"
            ></v-slider>
            <p
              class="px-6 text-center"
              :style="`height:32px; font-size: ${settings.font}px`"
            >
              测试文本 ABC 123
            </p>
            <v-card-actions>
              <v-btn
                text
                color="deep-purple accent-4"
                @click="
                  settings.font =
                    $store.state.localStorage.default.settings.fontSize
                "
              >
                恢复默认
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                text
                color="deep-purple accent-4"
                :disabled="
                  $store.state.localStorage.settings.fontSize === settings.font
                    ? ''
                    : false
                "
                @click="setFontSize"
              >
                应用字体设定
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-list-item-group>
      <v-divider class="my-4"></v-divider>
      <v-subheader class="px-6">功能</v-subheader>
      <v-list-item-group>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-history</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>启用房间历史记录 </v-list-item-title>
            <v-list-item-subtitle
              >开启后会在主页显示加入过的房间</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-switch
            v-model="settings.history"
            class="mr-4"
            @click="setEnableSearchHistory"
          ></v-switch>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-snackbar v-model="snackbar" bottom class="mb-8">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn text color="success" v-bind="attrs" @click="snackbar = false">
          关闭
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import drawerItem from '../components/drawer'
export default {
  middleware: ['fetch'],
  components: {
    'v-drawer': drawerItem,
  },
  data() {
    return {
      drawer: false,
      snackbar: false,
      text: '',
      dialog: {
        color: false,
        font: false,
      },
      settings: {
        color:
          this.$store.state.localStorage.settings.themeColor ||
          this.$store.state.localStorage.default.settings.themeColor,
        font:
          this.$store.state.localStorage.settings.fontSize ||
          this.$store.state.localStorage.default.settings.fontSize,
        history:
          (this.$store.state.localStorage.settings.enableSearchHistory ||
            this.$store.state.localStorage.default.settings
              .enableSearchHistory) === 'enable',
      },
    }
  },
  methods: {
    equal: (a, b) => {
      return a.toLowerCase() === b.toLowerCase()
    },
    setFontSize() {
      this.dialog.font = false
      this.$store.commit('localStorage/setFontSize', this.settings.font)
      document.documentElement.className =
        'font-' +
        (this.$store.state.localStorage.settings.fontSize ||
          this.$store.state.localStorage.default.settings.fontSize)

      this.snackbar = true
      this.text = '设置保存成功'
    },
    setThemeColor() {
      this.dialog.color = false
      this.$store.commit('localStorage/setThemeColor', this.settings.color)
      this.$vuetify.theme.themes.light.primary = this.settings.color

      this.snackbar = true
      this.text = '设置保存成功'
    },
    setEnableSearchHistory() {
      this.$store.commit(
        'localStorage/setEnableSearchHistory',
        this.settings.history ? 'enable' : 'disable'
      )
    },
  },
}
</script>

<style></style>
