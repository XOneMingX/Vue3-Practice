import axiosClient from './axiosClient'

function login(userInfo) {
  return axiosClient.post('/token/authenticate', userInfo)
}

export default {
  login
}
