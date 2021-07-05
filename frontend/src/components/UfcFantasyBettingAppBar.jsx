import React from 'react'
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
  const classes = useStyles()
  const history = useHistory()

  function navigateToPage (event, route) {
    event.preventDefault()
    history.push(route)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton}
                    color="inherit" aria-label="menu">
          <MenuIcon/>
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          UFC Fantasy Betting
        </Typography>
        <Button onClick={event => navigateToPage(event, Routes.SIGN_UP)}
                color="inherit">Sign Up</Button>
        <Button onClick={event => navigateToPage(event, Routes.LOGIN)}
                color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default UfcFantasyBettingAppBar
