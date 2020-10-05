import axios from 'axios'
axios.defaults.withCredentials = true
export default async function ({ store, redirect }) {
  try {
    const res = await axios.post('/api/user', {}, { withCredentials: true })
    console.log('fetch', res)
    if (res.data.code === 0) {
      const user = res.data.extend.user
      user.location = user.address
      delete user.address
      await store.commit('localStorage/setUserData', user)
    } else {
      redirect('/welcome')
    }
  } catch (error) {
    console.error(error)
    redirect('/welcome')
  }
}
