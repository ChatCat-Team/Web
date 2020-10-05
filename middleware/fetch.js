import axios from 'axios'
axios.defaults.withCredentials = true
export default async function ({ req, store, redirect }) {
  if (!process.server) {
    try {
      const res = await axios.post(
        'https://test.lifeni.life/api/user',
        {},
        { withCredentials: true }
      )
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
      console.error('fetch', error)
      redirect('/welcome')
    }
  } else {
    console.log(req.headers)
    const cookies = req.headers.cookie
    if (!cookies) {
      redirect('/welcome')
    } else {
      try {
        const res = await axios.post(
          'https://test.lifeni.life/api/user',
          {},
          {
            withCredentials: true,
            headers: {
              cookie: cookies,
            },
          }
        )
        console.log('fetch server', res)
        if (res.data.code === 0) {
          const user = res.data.extend.user
          user.location = user.address
          delete user.address
          await store.commit('localStorage/setUserData', user)
        } else {
          redirect('/welcome')
        }
      } catch (error) {
        console.error('fetch', error)
        redirect('/welcome')
      }
    }
  }
}
