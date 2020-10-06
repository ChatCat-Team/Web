import axios from 'axios'
axios.defaults.withCredentials = true
export default async function ({ app, redirect }) {
  if (!process.server) {
    try {
      const res = await axios.post(
        'https://test.lifeni.life/api/checkstatus',
        {},
        { withCredentials: true }
      )
      if (res.data.code !== 0) {
        redirect('/welcome')
      }
    } catch (error) {
      console.error('check', error)
      redirect('/welcome')
    }
  }
}
