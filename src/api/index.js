import axios from 'axios'

export function getSlider () {
  return axios.get('api/banner?type=1').then((res) => {
    return Promise.resolve(res)
  })
}
