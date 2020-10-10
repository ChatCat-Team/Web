import axios from 'axios'
axios.defaults.withCredentials = true
export default async function ({ req, params, store, redirect }) {
  if (!process.server) {
    try {
      const res = await axios.post(
        'https://test.lifeni.life/chat/chatroom/join',
        { roomid: params.id },
        { withCredentials: true }
      )
      if (res.data.code === 0) {
        const room = res.data.extend.chatroom
        await store.commit('sessionStorage/setRoomData', room)
      } else {
        redirect('/welcome')
      }
    } catch (error) {
      console.error('check', error)
      redirect('/welcome')
    }
  } else {
    const cookies = req.headers.cookie
    if (!cookies) {
      redirect('/welcome')
    } else {
      try {
        const res = await axios.post(
          'https://test.lifeni.life/chat/chatroom/join',
          { roomid: params.id },
          { withCredentials: true }
        )
        if (res.data.code === 0) {
          const room = res.data.extend.chatroom
          await store.commit('sessionStorage/setRoomData', room)
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
