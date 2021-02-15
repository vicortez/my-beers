// import { withTheme } from '@material-ui/core/styles'
import SvgIcon from '@material-ui/core/SvgIcon'
import React from 'react'

interface IProps {
  color?: string
  svgProps?: unknown
}

export const FunnelIcon: React.FC<IProps> = ({ color, svgProps }) => {
  return (
    <SvgIcon width="1em" height="1em" {...svgProps} viewBox="0 0 488.2 300">
      <path
        d="M179.85,246.2v139.2c1,16.8,14.6,23.7,32.2,17.7l86.2-54c5.1-4.2,9.3-10.4,9.3-17.7v-85.2l174.5-213
				c10.4-13.6,3-32.7-15.6-33.2H21.85C3.95,0-3.95,18.4,5.25,33.2L179.85,246.2z M422.85,40.5l-152.6,186c-2.1,3.2-4.2,7.3-4.2,12.5
				v81l-45.7,28V237.9c0-4.2-1.1-9.4-4.2-12.5L64.45,40.5H422.85z"
      />
    </SvgIcon>
  )
}
