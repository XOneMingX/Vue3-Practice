import axios from 'axios'

// Create an Axios instance
const axiosClient = axios.create({
  baseURL: 'https://localhost:44354/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosClient
