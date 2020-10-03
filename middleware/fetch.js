import axios from 'axios'

export default async function ({ store, redirect }) {
  const res = await axios.get('https://test.lifeni.life/api/user')
  // console.log('fetch', res)
  if (res.data.code === 0) {
    // console.log(res)
    const user = res.data.extend.user
    user.location = user.address
    delete user.address
    await store.commit('localStorage/setUserData', user)
  } else {
    // console.log('redirect to welcome')
    redirect('/welcome')
  }
}
