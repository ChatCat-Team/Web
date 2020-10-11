export const state = () => ({
  userData: {
    id: null,
    avatar: null,
    name: null,
    bio: null,
    location: null,
    phone: null,
  },
  settings: {
    themeColor: null,
    fontSize: null,
    enableSearchHistory: null,
  },
  default: {
    userData: {
      id: -1,
      avatar: 'https://test.lifeni.life/default_avatar.png',
      name: '匿名',
      bio: '未设置签名',
      location: '地球某处',
      phone: 'XXX XXXX XXXX',
    },
    settings: {
      themeColor: '#69c667',
      fontSize: 16,
      enableSearchHistory: 'enable',
    },
  },
})

export const mutations = {
  setUserData(state, data) {
    state.userData = data
  },

  setThemeColor(state, data) {
    state.settings.themeColor = data
  },

  setFontSize(state, data) {
    state.settings.fontSize = data
  },

  setEnableSearchHistory(state, data) {
    state.settings.enableSearchHistory = data
  },
}
