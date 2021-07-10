import { parseResponse } from '../utils/JsonUtils'
import { notifyResponseStatus } from '../utils/NotificationUtils'
import { authorizeHeaders } from '../utils/ApiUtils'
import Api from '../constants/Api'

export const getProfile = async (context) => {
  const { setProfile } = context
  const requestOptions = {
    method: 'GET',
    headers: authorizeHeaders({
      'Content-Type': 'application/json'
    })
  }
  const response = await fetch(Api.PROFILE, requestOptions)
  const parsedResponse = await parseResponse(response)
  if (notifyResponseStatus(parsedResponse, null, context)) {
    setProfile(parsedResponse.body)
    return true
  }
  return false
}
