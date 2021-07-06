import React, { useContext, useState } from 'react'
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  TextField,
  Typography
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import DevelopmentWarningCard from '../../components/DevelopmentWarningCard'
import { signUp } from '../../api/AuthenticationAPI'
import { useSnackbar } from 'notistack'
import theme from '../../theme'
import UserContext from '../UserContext'

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    width: '50%',
    maxWidth: '500px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  warningCard: {
    marginTop: theme.spacing(3),
    width: '100%'
  }
}))

const SignUp = () => {
  const classes = useStyles(theme)
  const { enqueueSnackbar } = useSnackbar()
  const { reloadUserContext } = useContext(UserContext)
  const context = {
    enqueueSnackbar,
    reloadUserContext
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
    const success = await signUp(username, password, context)
    if (success) {
      history.back()
    } else {
      setPassword('')
    }
    setIsSubmitting(false)
  }

  return (
    <Container className={classes.container}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
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
        Sign Up
      </Button>
      <DevelopmentWarningCard className={classes.warningCard}/>
    </Container>
  )
}

export default SignUp
