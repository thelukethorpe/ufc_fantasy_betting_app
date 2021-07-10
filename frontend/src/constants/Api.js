const HTTP_PROXY = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : 'http://localhost:8080'
const API = HTTP_PROXY + '/api'
const API_USER = API + '/user'
const API_USER_AUTH = API_USER + '/auth'

export default {
  SIGN_UP: API_USER_AUTH + '/sign-up',
  LOGIN: API_USER_AUTH + '/login',
  PROFILE: API_USER + '/profile',
  LEADERBOARD: API + '/leaderboard'
}
