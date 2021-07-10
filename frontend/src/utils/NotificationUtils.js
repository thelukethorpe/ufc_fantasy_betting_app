const TRUNCATE_THRESH = 25

export const notifyResponseStatus = (response, getMsgOnSuccessful, context) => {
  const { enqueueSnackbar } = context

  if (response.http.ok) {
    if (getMsgOnSuccessful !== null) {
      enqueueSnackbar(getMsgOnSuccessful(response.body), { variant: 'success' })
    }
    return true
  }

  if (response.body && response.body.errors) {
    enqueueSnackbar(response.body.errors.join('\n\n'), { variant: 'error' })
  } else {
    let error = response.http.statusText
    if (error.length > TRUNCATE_THRESH) {
      error = error.substr(0, error.length - TRUNCATE_THRESH)
    }
    enqueueSnackbar(
      `Request to server failed with status: ${response.http.status}, ${error}.`,
      { variant: 'error' })
  }

  return false
}
