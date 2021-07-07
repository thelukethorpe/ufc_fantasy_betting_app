import React, { useContext, useState } from 'react'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  TextField
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { login } from '../api/AuthenticationAPI'
import { useSnackbar } from 'notistack'
import theme from '../theme'
import UserContext from '../pages/UserContext'

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1
  },
  dialog: { textAlign: 'center' }
}))

const LoginDialog = () => {
  const classes = useStyles(theme)
  const { enqueueSnackbar } = useSnackbar()
  const { reloadUserContext } = useContext(UserContext)
  const context = {
    enqueueSnackbar,
    reloadUserContext
  }

  const [isOpen, setIsOpen] = useState(false)
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const onSubmit = async () => {
    setIsSubmitting(true)
    const success = await login(username, password, context)
    if (success) {
      setIsOpen(false)
    }
    setIsSubmitting(false)
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setIsOpen(false)
    }
  }

  return (
    <div>
      <Button color="inherit" onClick={() => setIsOpen(true)}>
        Login
      </Button>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="sm"
        scroll="paper"
        className={classes.dialog}
      >
        <DialogTitle>
          Login
        </DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            value={username}
            onChange={handleUsernameChange}
            autoFocus
          />
          <FormControl variant="outlined"
                       margin="normal"
                       fullWidth>
            <InputLabel
              htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onSubmit}
            disabled={isSubmitting}>
            {isSubmitting && (
              <>
                <CircularProgress size={15}/>
                &nbsp;&nbsp;
              </>
            )}
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default LoginDialog
