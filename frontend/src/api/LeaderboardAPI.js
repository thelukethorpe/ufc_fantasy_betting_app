import Api from '../constants/Api'
import { parseResponse } from '../utils/JsonUtils'
import { notifyResponseStatus } from '../utils/NotificationUtils'

export const getLeaderboard = async (pageNumber, pageSize, context) => {
  const { setLeaderboard } = context
  const path = `${Api.LEADERBOARD}?pageNumber=${pageNumber}&pageSize=${pageSize}`
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response = await fetch(path, requestOptions)
  const parsedResponse = await parseResponse(response)
  if (notifyResponseStatus(parsedResponse, null, context)) {
    setLeaderboard(parsedResponse.body.leaderboard)
    return true
  }
  return false
}
