import axios from 'axios'

export default async function ({ redirect }) {
  try {
    const res = await axios.get('https://test.lifeni.life/api/chestatus')
    if (res.data.code !== 0) {
      redirect('/welcome')
    }
  } catch (error) {
    console.error(error)
    redirect('/welcome')
  }
}
