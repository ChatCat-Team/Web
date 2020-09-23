export const state = () => ({
  userData: '',
})

export const mutations = {
  setUserData(state, data) {
    state.userData = data
  },
}

export const actions = {
  setUserData(context, data) {
    context.commit('setUserData', data)
  },
}
