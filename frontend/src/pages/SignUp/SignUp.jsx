import React from 'react'
import {
  Avatar,
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
  const classes = useStyles()
  const [values, setValues] = React.useState({
    username: '',
    password: '',
    showPassword: false
  })

  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value
    })
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <Container className={classes.container}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
        />
        <FormControl variant="outlined"
                     margin="normal"
                     required
                     fullWidth>
          <InputLabel
            htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
      </form>
      <DevelopmentWarningCard className={classes.warningCard}/>
    </Container>
  )
}

export default SignUp
