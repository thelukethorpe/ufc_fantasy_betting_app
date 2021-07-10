import Authentication from '../constants/Authentication'

export const authorizeHeaders = (headers) => {
  return {
    ...headers,
    Authorization: `Bearer ${sessionStorage.getItem(Authentication.TOKEN)}`
  }
}
