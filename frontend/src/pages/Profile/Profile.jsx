import React, { useEffect, useState } from 'react'
import * as AuthenticationAPI from '../../api/AuthenticationAPI'
import {
  CircularProgress,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  withStyles
} from '@material-ui/core'
import theme from '../../theme'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import PersonIcon from '@material-ui/icons/Person'
import { useSnackbar } from 'notistack'
import * as UserAPI from '../../api/UserAPI'

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1
  },
  div: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    marginTop: theme.spacing(5),
    width: '50%',
    minWidth: 500,
    maxWidth: 1000
  }
}))

const StyledTableCell = withStyles((theme) => ({
  body: {
    fontSize: 24
  }
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow)

const Profile = () => {
  const classes = useStyles(theme)
  const { enqueueSnackbar } = useSnackbar()

  const [profile, setProfile] = useState({
    username: AuthenticationAPI.getUsername(),
    wallet: null
  })

  const context = {
    enqueueSnackbar,
    setProfile
  }

  useEffect(() => {
    UserAPI.getProfile(context)
  }, [])

  const getWalletAttribute = (attribute) => {
    return profile.wallet !== null
      ? profile.wallet[attribute]
      : <CircularProgress size={15}/>
  }
  return (
    <div className={classes.div}>
      <TableContainer className={classes.container} component={Paper}>
        <Table aria-label="table">
          <colgroup>
            <col style={{ width: '40%' }}/>
            <col style={{ width: '60%' }}/>
          </colgroup>
          <TableBody>
            <StyledTableRow key="username">
              <StyledTableCell align="left" component="th" scope="row">
                <PersonIcon/>
                &nbsp;
                {'Username'}
              </StyledTableCell>
              <StyledTableCell align="left">
                {profile.username}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow key="balance">
              <StyledTableCell align="left" component="th" scope="row">
                <AttachMoneyIcon/>
                &nbsp;
                {'Wallet Balance'}
              </StyledTableCell>
              <StyledTableCell align="left">
                {getWalletAttribute('balance')}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Profile
