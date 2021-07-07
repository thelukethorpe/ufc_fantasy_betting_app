import React from 'react'

const UserContext = React.createContext({
  isLoggedIn: false,
  reloadUserContext: () => {
  }
})

export default UserContext
