import { createMuiTheme } from '@material-ui/core/styles'

import SternbachOtf from './fonts/Sternbach.otf'

const sternbach = {
  fontFamily: 'Sternbach',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Sternbach'),
    local('Sternbach-Regular'),
    url(${SternbachOtf}) format('otf')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
}

export default createMuiTheme({
  typography: {
    fontFamily: 'Sternbach, Segoe UI'
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [sternbach]
      }
    }
  },
  palette: {
    primary: {
      main: '#000000'
    },
    secondary: {
      main: '#FFFFFF'
    },
    error: {
      main: '#c1c1c1'
    },
    textPrimary: {
      main: '#229922'
    }
  }
})
