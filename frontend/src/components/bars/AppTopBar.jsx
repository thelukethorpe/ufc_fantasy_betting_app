import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography
} from '@material-ui/core'
import Routes from '../../constants/Routes'
import LoginDialog from '../dialogs/LoginDialog'
import theme from '../../theme'
import * as AuthenticationAPI from '../../api/AuthenticationAPI'
import UserContext from '../../pages/UserContext'
import { useSnackbar } from 'notistack'
import AppSideBar from './AppSideBar'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

const AppTopBar = () => {
  const classes = useStyles(theme)
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const {
    isLoggedIn,
    reloadUserContext
  } = useContext(UserContext)
  const currentPath = window.location.pathname
  const context = {
    enqueueSnackbar,
    reloadUserContext
  }

  useEffect(() => {
    Routes.PROTECTED_LIST.forEach((routePath) => {
      if (!isLoggedIn && currentPath === routePath) {
        enqueueSnackbar('You must be logged in to see this page.',
          { variant: 'info' })
        history.push(Routes.SIGN_UP)
      }
    })
  }, [isLoggedIn, currentPath])

  const navigateToPage = (route) => (event) => {
    event.preventDefault()
    history.push(route)
  }

  const logout = (event) => {
    AuthenticationAPI.logout(context)
    navigateToPage(event, Routes.HOME)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <AppSideBar/>
        <Typography className={classes.title}>
          <Button color="inherit"
                  onClick={navigateToPage(Routes.HOME)}>
            <Typography variant="h6" className={classes.title}>
              UFC Fantasy Betting
            </Typography>
          </Button>
        </Typography>
        {
          !isLoggedIn
            ? (<>
              <Button onClick={navigateToPage(Routes.SIGN_UP)}
                      color="inherit">Sign Up</Button>
              <LoginDialog/>
            </>)
            : (<>
              <IconButton color="inherit"
                          onClick={navigateToPage(Routes.PROFILE)}>
                <AccountCircleIcon/>
              </IconButton>
              <Button onClick={logout} color="inherit">Logout</Button>
            </>)
        }

      </Toolbar>
    </AppBar>
  )
}

export default AppTopBar
