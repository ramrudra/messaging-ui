import {Palette} from './colorPalette.js'
import {darkBlack, fullBlack, grey100, grey500, grey300} from 'material-ui/styles/colors.js'
import {fade} from 'material-ui/utils/colorManipulator.js'
import spacing from 'material-ui/styles/spacing.js'

export const customMuiTheme = {
  spacing: spacing,
  fontFamily: 'Fira Sans, sans-serif',
  palette: {
    primary1Color: Palette.primary,
    primary2Color: Palette.darkPrimary,
    primary3Color: Palette.lightPrimary,
    accent1Color: Palette.accent,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: Palette.text,
    alternateTextColor: Palette.white,
    canvasColor: Palette.white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: Palette.primary,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
}

