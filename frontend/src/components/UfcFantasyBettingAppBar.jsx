import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Routes from '../constants/Routes'
import LoginDialog from './LoginDialog'
import theme from '../theme'
import * as AuthenticationAPI from '../api/AuthenticationAPI'
import UserContext from '../pages/UserContext'
import { useSnackbar } from 'notistack'

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

const UfcFantasyBettingAppBar = () => {
  const classes = useStyles(theme)
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const {
    isLoggedIn,
    reloadUserContext
  } = useContext(UserContext)
  const context = {
    enqueueSnackbar,
    reloadUserContext
  }

  const navigateToPage = (event, route) => {
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
        <IconButton edge="start" className={classes.menuButton}
                    color="inherit" aria-label="menu">
          <MenuIcon/>
        </IconButton>
        <Typography className={classes.title}>
          <Button color="inherit"
                  onClick={event => navigateToPage(event, Routes.HOME)}>
            <Typography variant="h6" className={classes.title}>
              UFC Fantasy Betting
            </Typography>
          </Button>
        </Typography>
        {
          !isLoggedIn
            ? (<>
              <Button onClick={event => navigateToPage(event, Routes.SIGN_UP)}
                      color="inherit">Sign Up</Button>
              <LoginDialog/>
            </>)
            : (<>
              <Button onClick={logout} color="inherit">Logout</Button>
            </>)
        }

      </Toolbar>
    </AppBar>
  )
}

export default UfcFantasyBettingAppBar
