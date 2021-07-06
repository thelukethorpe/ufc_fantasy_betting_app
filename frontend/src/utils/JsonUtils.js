export const parseResponse = async (response) => {
  let body = null
  try {
    body = await response.json()
  } catch (unused) {
  }
  return {
    body: body,
    http: response
  }
}
