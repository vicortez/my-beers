import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles'
import { purple, green, orange, grey } from '@material-ui/core/colors'
import { Theme } from '@material-ui/core'

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    footerButtonHeight: string

    //   status: {
    //     danger: string
    //   }
    //   overrides: {
    //     MuiToggleButton: {
    //       selected: {
    //         backGroundColor: string
    //       }
    //     }
    //   }
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    footerButtonHeight: string

    //   appDrawer?: {
    //     width?: React.CSSProperties['width']
    //     breakpoint?: Breakpoint
    // }
  }
}

export const createMyTheme = (options?: ThemeOptions): Theme => {
  return createMuiTheme({
    footerButtonHeight: '6em',

    // overrides: {
    //   MuiToggleButton: {
    //     selected: {
    //       backGroundColor: 'red',
    //     },
    //   },
    // },
    // palette: {
    //   primary: {
    //     main: purple[500],
    //     grey: grey[400],
    //   },
    //   secondary: {
    //     main: green[500],
    //   },
    // },
    // status: {
    //   danger: orange[500],
    // },
  })
}
