import React, { useState } from 'react'
import {
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from '@material-ui/core'
import theme from '../../theme'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import MenuIcon from '@material-ui/icons/Menu'
import Routes from '../../constants/Routes'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  drawerRevealButton: {
    marginRight: theme.spacing(2)
  },
  drawerHideButton: {
    height: 63
  },
  list: {
    width: 250
  }
}))

const AppSideBar = () => {
  const classes = useStyles(theme)
  const history = useHistory()
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setIsOpen(open)
  }

  const navigateToPage = (route) => (event) => {
    event.preventDefault()
    history.push(route)
  }

  return (
    <React.Fragment>
      <IconButton edge="start" className={classes.drawerRevealButton}
                  color="inherit" aria-label="menu"
                  onClick={toggleDrawer(true)}>
        <MenuIcon/>
      </IconButton>
      <Drawer anchor="left" open={isOpen}
              onClose={toggleDrawer(false)}>
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Button onClick={toggleDrawer(false)}
                  className={classes.drawerHideButton} fullWidth>
            <ChevronLeftIcon/>
          </Button>
          <Divider/>
          <List>
            <ListItem button key="Leaderboard"
                      onClick={navigateToPage(Routes.LEADERBOARD)}>
              <ListItemIcon>
                <FormatListNumberedIcon/>
              </ListItemIcon>
              <ListItemText primary="Leaderboard"/>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </React.Fragment>
  )
}

export default AppSideBar
