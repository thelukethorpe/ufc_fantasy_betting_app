import Api from '../constants/Api'
import { notifyResponseStatus } from '../utils/NotificationUtils'
import Authentication from '../constants/Authentication'
import { parseResponse } from '../utils/JsonUtils'

export const getUsername = () => {
  return sessionStorage.getItem(Authentication.USERNAME)
}

export const isLoggedIn = () => {
  return sessionStorage.getItem(Authentication.TOKEN) !== null
}

export const signUp = async (username, password, context) => {
  const { reloadUserContext } = context
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  }
  const response = await fetch(Api.SIGN_UP, requestOptions)
  const parsedResponse = await parseResponse(response)
  if (notifyResponseStatus(parsedResponse, (body) => 'Sign Up successful!',
    context)) {
    const user = parsedResponse.body
    sessionStorage.setItem(Authentication.USERNAME, user.username)
    sessionStorage.setItem(Authentication.TOKEN, user.token)
    reloadUserContext()
    return true
  }
  return false
}

export const login = async (username, password, context) => {
  const { reloadUserContext } = context
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  }
  const response = await fetch(Api.LOGIN, requestOptions)
  const parsedResponse = await parseResponse(response)
  if (notifyResponseStatus(parsedResponse, (body) => 'Login successful!',
    context)) {
    const user = parsedResponse.body
    sessionStorage.setItem(Authentication.USERNAME, user.username)
    sessionStorage.setItem(Authentication.TOKEN, user.token)
    reloadUserContext()
    return true
  }
  return false
}

export const logout = (context) => {
  const {
    enqueueSnackbar,
    reloadUserContext
  } = context
  enqueueSnackbar('Logged out.', { variant: 'info' })
  sessionStorage.removeItem(Authentication.USERNAME)
  sessionStorage.removeItem(Authentication.TOKEN)
  reloadUserContext()
}
