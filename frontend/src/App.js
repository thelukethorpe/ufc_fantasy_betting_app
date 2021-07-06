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
import UfcFantasyBettingAppBar from './components/UfcFantasyBettingAppBar'
import * as AuthenticationAPI from './api/AuthenticationAPI'

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
              <UfcFantasyBettingAppBar/>
              <Switch>
                <Route path={Routes.SIGN_UP}>
                  <SignUp/>
                </Route>
                <Route path={Routes.HOME}>
                  <Home/>
                </Route>
              </Switch>
            </Router>
          </UserContext.Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
