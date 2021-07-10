import React, { useEffect, useState } from 'react'
import './App.css'
import theme from './theme'
import Routes from './constants/Routes'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { SnackbarProvider } from 'notistack'
import UserContext from './pages/UserContext'
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import Profile from './pages/Profile/Profile'
import AppTopBar from './components/bars/AppTopBar'
import * as AuthenticationAPI from './api/AuthenticationAPI'
import Favicon from 'react-favicon'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthenticationAPI.isLoggedIn())
  const reloadUserContext = () => {
    setIsLoggedIn(AuthenticationAPI.isLoggedIn())
  }

  useEffect(() => {
    if (isLoggedIn) {
      reloadUserContext()
    }
  }, [isLoggedIn])

  return (
    <div>
      <Favicon
        url='https://raw.githubusercontent.com/thelukethorpe/ufc_fantasy_betting_app/main/frontend/public/favicon.ico'/>
      <ThemeProvider theme={theme}>
        <SnackbarProvider anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}>
          <UserContext.Provider value={{
            isLoggedIn,
            reloadUserContext
          }}>
            <Router>
              <AppTopBar/>
              <Switch>
                <Route path={Routes.LEADERBOARD} component={Leaderboard}/>
                <Route path={Routes.SIGN_UP} component={SignUp}/>
                <Route path={Routes.PROFILE} component={Profile}/>
                <Route path={Routes.HOME} component={Home}/>
              </Switch>
            </Router>
          </UserContext.Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
