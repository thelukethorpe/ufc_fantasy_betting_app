const HTTP_PROXY = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : 'http://localhost:8080'
const API = HTTP_PROXY + '/api'
const API_AUTH = API + '/user/auth'

export default {
  SIGN_UP: API_AUTH + '/sign-up',
  LOGIN: API_AUTH + '/login'
}
