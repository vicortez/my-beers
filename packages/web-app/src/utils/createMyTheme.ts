import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles'
import { purple, green, orange, grey } from '@material-ui/core/colors'

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    status: {
      danger: string
    }
  }
  // allow configuration using `createMuiTheme`
  // interface ThemeOptions {
  //   appDrawer?: {
  //     width?: React.CSSProperties['width']
  //     breakpoint?: Breakpoint
  //   }
  // }
}

export const createMyTheme = (options?: ThemeOptions) => {
  return createMuiTheme({
    palette: {
      primary: {
        main: purple[500],
        grey: grey[400],
      },
      secondary: {
        main: green[500],
      },
    },
    status: {
      danger: orange[500],
    },
  } as any)
}
