<template>
  <div style="position: relative; min-height: calc(100vh - 32px)">
    <v-app-bar flat dark elevation="0" style="z-index: 1000">
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
      <v-list class="mt-12">
        <v-list-item>
          <v-avatar size="96" class="avatar ma-4">
            <v-img src="default_avatar.png" alt="Your Avatar"></v-img>
          </v-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content class="px-4 py-8">
            <v-list-item-title class="text-h6 mb-2">你的名字</v-list-item-title>
            <v-list-item-subtitle class="text-subtitle-1"
              >这里是个性签名</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list nav>
        <v-drawer-item></v-drawer-item>
      </v-list>
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
            <v-color-picker v-model="settings.color" flat></v-color-picker>
            <v-card-actions>
              <v-btn
                text
                color="deep-purple accent-4"
                @click="settings.color = settings.default.color"
              >
                恢复默认
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                text
                color="deep-purple accent-4"
                :disabled="
                  equal(settings.default.color, settings.color) ? '' : false
                "
                @click="dialog.color = false"
              >
                应用主题颜色
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog.font" width="300">
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
              step="1"
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
                @click="settings.font = settings.default.font"
              >
                恢复默认
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                text
                color="deep-purple accent-4"
                :disabled="settings.default.font === settings.font ? '' : false"
                @click="dialog.font = false"
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
            <v-list-item-title>启用搜索历史记录 </v-list-item-title>
            <v-list-item-subtitle
              >开启后会在主页显示搜索历史记录</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-switch class="mr-4"></v-switch>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import drawerItem from '../components/drawer'
export default {
  layout: 'default',
  components: {
    'v-drawer-item': drawerItem,
  },
  data: () => ({
    drawer: false,
    dialog: {
      color: false,
      font: false,
    },
    settings: {
      default: {
        color: '#69c667',
        font: 16,
      },
      color: '#69c667',
      font: 16,
    },
  }),
  methods: {
    equal: (a, b) => {
      return a.toLowerCase() === b.toLowerCase()
    },
  },
}
</script>

<style></style>
