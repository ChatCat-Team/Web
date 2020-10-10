import axios from 'axios'
axios.defaults.withCredentials = true
export default async function ({ req, params, store, redirect }) {
  if (!process.server) {
    try {
      const res = await axios.post(
        'http://test.lifeni.life/chat/chatroom/join',
        { roomid: params.id },
        { withCredentials: true }
      )
      if (res.data.code === 0) {
        const room = res.data.extend.chatroom
        await store.commit('sessionStorage/setRoomData', room)
      } else if (res.data.code === 2) {
        redirect(`/not-found?id=${params.id}`)
      } else if (res.data.code === 3) {
        redirect('/welcome')
      } else {
        this.$nuxt.error({
          statusCode: 400,
          message: '未知错误，请查看浏览器控制台获取错误的详细信息',
        })
      }
    } catch (error) {
      console.error('check', error)
    }
  } else {
    const cookies = req.headers.cookie
    if (!cookies) {
      redirect('/welcome')
    } else {
      try {
        const res = await axios.post(
          'http://test.lifeni.life/chat/chatroom/join',
          { roomid: params.id },
          { withCredentials: true }
        )
        if (res.data.code === 0) {
          const room = res.data.extend.chatroom
          await store.commit('sessionStorage/setRoomData', room)
        } else if (res.data.code === 2) {
          redirect(`/not-found?id=${params.id}`)
        } else if (res.data.code === 3) {
          redirect('/welcome')
        } else {
          this.$nuxt.error({
            statusCode: 400,
            message: '未知错误，请查看浏览器控制台获取错误的详细信息',
          })
        }
      } catch (error) {
        console.error('check', error)
      }
    }
  }
}
