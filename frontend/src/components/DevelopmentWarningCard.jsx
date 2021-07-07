import React from 'react'
import { Alert, AlertTitle } from '@material-ui/lab'

const DevelopmentWarningCard = (props) => {
  return (
    <Alert severity="warning" {...props}>
      <AlertTitle>Warning</AlertTitle>
      This app is currently in development.
      <br/><strong>Your credentials may be at risk.</strong><br/>
      Be careful which password you choose.
    </Alert>
  )
}

export default DevelopmentWarningCard
