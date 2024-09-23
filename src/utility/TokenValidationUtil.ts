import { jwtDecode } from 'jwt-decode'

function isTokenValid(token: string | undefined) {
  if (!token) {
    return false
  }

  try {
    const decoded = jwtDecode(token)
    const currentTime = Date.now() / 1000
    if (decoded.exp === undefined) {
      return false // Handle the case where exp is not present
    }
    return decoded.exp > currentTime
  } catch (error) {
    console.error('Invalid token:', error)
    return false
  }
}

export { isTokenValid }
