import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import './App.css'
import Home from './pages/Home/Home'
import Routes from './constants/Routes'
import theme from './theme'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import UfcFantasyBettingAppBar from './components/UfcFantasyBettingAppBar'

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <UfcFantasyBettingAppBar/>
          <Switch>
            <Route path={Routes.SIGN_UP}>
              <SignUp/>
            </Route>
            <Route path={Routes.LOGIN}>
              <Login/>
            </Route>
            <Route path={Routes.HOME}>
              <Home/>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  )
}

export default App
