import axios from 'axios'
axios.defaults.withCredentials = true
export default async function ({ redirect }) {
  try {
    const res = await axios.post(
      '/api/chestatus',
      {},
      { withCredentials: true }
    )
    console.log('check', res)
    if (res.data.code !== 0) {
      redirect('/welcome')
    }
  } catch (error) {
    console.error(error)
    redirect('/welcome')
  }
}
