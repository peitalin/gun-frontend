
import { createMuiTheme, fade } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core/styles';
import { ThemeOptions } from "@material-ui/core/styles";


declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    colors: {
      cream: React.CSSProperties['color'],
      darkWhite: React.CSSProperties['color'],
      slateGrey: React.CSSProperties['color'],
      blue: React.CSSProperties['color'],
      lightBlue: React.CSSProperties['color'],
      ultramarineBlue: React.CSSProperties['color'],
      mediumBlack: React.CSSProperties['color'],
      black1A: React.CSSProperties['color'],
      uniswapLightestGrey: React.CSSProperties['color'],
      uniswapLightGrey: React.CSSProperties['color'],
      uniswapLighterGrey: React.CSSProperties['color'],
      uniswapGrey: React.CSSProperties['color'],
      uniswapMediumGrey: React.CSSProperties['color'],
      uniswapLightNavy: React.CSSProperties['color'],
      uniswapNavy: React.CSSProperties['color'],
      uniswapMediumNavy: React.CSSProperties['color'],
      uniswapGreyNavy: React.CSSProperties['color'],
      uniswapDarkNavy: React.CSSProperties['color'],
      //
      green: React.CSSProperties['color'],
    },
    gradients: {
      gradientUniswapDark: {
        background: React.CSSProperties['background'],
        color1: React.CSSProperties['color'],
        color2: React.CSSProperties['color'],
      },
      gradientUniswapFluro: {
        background: React.CSSProperties['background'],
        color1: React.CSSProperties['color'],
        color2: React.CSSProperties['color'],
      },
      gradientGrey:  {
        background: React.CSSProperties['background'],
        color1: React.CSSProperties['color'],
        color2: React.CSSProperties['color'],
      },
      gradientGrey2:  {
        background: React.CSSProperties['background'],
        color1: React.CSSProperties['color'],
        color2: React.CSSProperties['color'],
      },
      gradientGrey3:  {
        background: React.CSSProperties['background'],
        color1: React.CSSProperties['color'],
        color2: React.CSSProperties['color'],
      },
    },
  }
  interface ThemeOptions {
    colors: {
      cream: React.CSSProperties['color'],
      darkWhite: React.CSSProperties['color'],
      slateGrey: React.CSSProperties['color'],
      blue: React.CSSProperties['color'],
      lightBlue: React.CSSProperties['color'],
      ultramarineBlue: React.CSSProperties['color'],
      mediumBlack: React.CSSProperties['color'],
      black1A: React.CSSProperties['color'],
      uniswapLightestGrey: React.CSSProperties['color'],
      uniswapLightGrey: React.CSSProperties['color'],
      uniswapLighterGrey: React.CSSProperties['color'],
      uniswapGrey: React.CSSProperties['color'],
      uniswapMediumGrey: React.CSSProperties['color'],
      uniswapLightNavy: React.CSSProperties['color'],
      uniswapNavy: React.CSSProperties['color'],
      uniswapMediumNavy: React.CSSProperties['color'],
      uniswapGreyNavy: React.CSSProperties['color'],
      uniswapDarkNavy: React.CSSProperties['color'],
    },
    gradients: {
      gradientUniswapDark: {
        background: React.CSSProperties['background'],
        color1: React.CSSProperties['color'],
        color2: React.CSSProperties['color'],
      },
      gradientUniswapFluro: {
        background: React.CSSProperties['background'],
        color1: React.CSSProperties['color'],
        color2: React.CSSProperties['color'],
      },
      gradientGrey2:  {
        background: React.CSSProperties['background'],
        color1: React.CSSProperties['color'],
        color2: React.CSSProperties['color'],
      },
      gradientGrey3:  {
        background: React.CSSProperties['background'],
        color1: React.CSSProperties['color'],
        color2: React.CSSProperties['color'],
      },
    },
  }
}


export const isThemeDark = (theme: Theme) => {
  return theme.palette.type === 'dark'
}

// Ultramarine blue
const secondary = "#2484FF"
const foregroundColor = "#222429"
const backgroundColor = "#2E3443"

export const Colors = {
  secondary: secondary,
  secondaryBright: fade(secondary, 0.9),
  primary: "#191919",
  // steel blue grey
  slateGrey: "#EDF0F2",
  slateGreyDark: "#E2E8ED",
  slateGreyDarker: "#D0D5DF",
  slateGreyDarkest: "#B0B5BF",
  slateGreyLightestBlack: "#888888",
  slateGreyLighterBlack: "#666666",
  slateGreyLightBlack: "#555555",
  slateGreyBlack: "#444444",
  // greyscale
  backgroundColor: backgroundColor,
  foregroundColor: foregroundColor,
  white: "#fefefe",
  cream: "#fafafa",
  darkWhite: "#F7F7F7",
  lightestGrey: "#f4f4f4",
  lighterGrey: "#eeeeee",
  lightGrey: "#e8e8e8",
  mediumLightGrey: "#dadbdd", // Description Input grey, Fiverr grey lines
  mediumGrey: "#ccc",
  ghostGrey: "#bbb",
  dropDownGrey: "rgba(152,152,152,0.1)",
  dropDownGreyHover: "rgba(152,152,152,0.15)",
  grey: "#aaa",
  darkerGrey: "#888",
  darkGrey: "#767676",
  charcoal: "#484848",
  lighterBlack: "#333333",
  mediumBlack: "#252525",
  black1A: "#1A1A1A",
  black: "#111111",
  pitchBlack: "#000000",
  // purples
  magenta: "#EB466D",
  purple: "#A981EB",
  lightPurple: "#B8B3E9",
  // red
  fadedRed: "rgba(224, 88, 76, 0.8)", // for errors
  darkestRed: "#842022",
  darkerRed: "#9C2829",
  darkRed: "#AF2B2F",
  red: "#C32E2D",
  lightRed: "#DF3A37",
  lighterRed: "#E44D49",
  pink: "#DC848B",
  // green
  green: "#57BC7A",
  lightGreen: '#ABEABE',
  greenCool: "#419677",
  greenCoolLight:'#6CBAA3',
  // blue
  ultramarineBlueDarkest: '#005ed7',
  ultramarineBlueDarker: '#0069f0',
  ultramarineBlueDark: '#0b76ff',
  ultramarineBlue: secondary,
  ultramarineBlueLight: '#3e92ff',
  ultramarineBlueLighter: '#3e92ff',
  ultramarineBlueLightest: '#71afff',
  blue: "#1DA1F3",
  lightBlue: '#479FF4',
  // yellow
  lightYellow: '#FADD8F',
  paleYellow: "#FCE8A6",
  yellow: '#EDC376',
  // gradient
  gradientPurple1: '#fbc2eb',
  gradientPurple2: '#a18cd1',
  gradientGrey1: '#fdfdfd',
  gradientGrey2: '#ebedee',
  gradientFlamingo1: '#f093fb',
  gradientFlamingo2: '#f5576c',
  // uniswap

  uniswapLightestGrey: '#B4B5BB',
  uniswapLightGrey: '#C4C5CB',
  uniswapLighterGrey: '#6D7283',
  uniswapGrey: '#41444E',
  uniswapMediumGrey: '#65666D',
  uniswapLightNavy: '#3A3F4A',
  uniswapNavy: '#2E3443',
  uniswapMediumNavy: '#2D2F36',
  uniswapGreyNavy: '#282A31',
  uniswapDarkNavy: "#222429",
  uniswapBrown: '#2A232C',
  gradientUniswapDark1: "#2E3545",
  gradientUniswapDark2: "#2D2F36",
  gradientUniswapFluro1: "#DC3078",
  gradientUniswapFluro2: "#5B4DBA",
  gradientUniswapPurple: "#8E4995",
  gradientUniswapBlue1: "#3773DE",
  gradientUniswapGreen: "#57BC7A",
  gradientUniswapBlueGreen: '#568DB3',
  modalBackground: 'rgba(62, 62, 82, .85)',
  // modalBackground: "rgba(47, 57, 65, .85)",
};

export const Gradients = {
  gradientPurple:  {
    background: `linear-gradient(120deg, ${Colors.gradientPurple1} 0%, ${Colors.gradientPurple2} 70%)`,
    color1: Colors.gradientPurple1,
    color2: Colors.gradientPurple2,
  },
  gradientGrey:  {
    background: `linear-gradient(120deg, ${Colors.gradientGrey1} 25%, ${Colors.gradientGrey2} 50%, ${Colors.gradientGrey1} 75%)`,
    color1: Colors.gradientGrey1,
    color2: Colors.gradientGrey2,
  },
  gradientGrey2:  {
    background: `linear-gradient(120deg, ${Colors.gradientGrey1} 25%, ${Colors.gradientGrey2} 100%)`,
    color1: Colors.gradientGrey1,
    color2: Colors.gradientGrey2,
  },
  gradientGrey2Rotated:  {
    background: `linear-gradient(300deg, ${Colors.gradientGrey1} 25%, ${Colors.gradientGrey2} 100%)`,
    color1: Colors.gradientGrey1,
    color2: Colors.gradientGrey2,
  },
  gradientGrey3:  {
    background: `linear-gradient(120deg, ${Colors.gradientGrey2} 25%, ${Colors.gradientGrey1} 50%, ${Colors.gradientGrey1} 75%)`,
    color1: Colors.gradientGrey1,
    color2: Colors.gradientGrey2,
  },
  gradientFeaturedDark:  {
    background: `linear-gradient(110deg, ${Colors.uniswapDarkNavy} 25%, ${Colors.uniswapNavy} 80%)`,
    color1: Colors.uniswapDarkNavy,
    color2: Colors.uniswapNavy,
  },
  gradientFeaturedLight:  {
    background: `linear-gradient(110deg, ${Colors.slateGreyDark} 25%, ${Colors.white} 80%)`,
    color1: Colors.slateGreyDark,
    color2: Colors.white,
  },
  gradientFlamingo:  {
    background: `linear-gradient(120deg, ${Colors.gradientFlamingo1} 0%, ${Colors.gradientFlamingo2} 100%)`,
    color1: Colors.gradientFlamingo1,
    color2: Colors.gradientFlamingo2,
  },
  gradientBlack:  {
    background: `linear-gradient(120deg, ${Colors.lighterBlack} 0%, ${Colors.black} 90%)`,
    color1: Colors.lighterBlack,
    color2: Colors.black,
  },
  gradientLightBlack:  {
    background: `linear-gradient(120deg, ${Colors.black} 0%, ${Colors.slateGreyBlack} 90%)`,
    // background: `linear-gradient(120deg, ${Colors.slateGreyDarker} 0%, ${Colors.slateGreyDark} 90%)`,
    color1: Colors.black,
    color2: Colors.slateGreyBlack,
  },
  gradientSlategrey:  {
    background: `linear-gradient(120deg, ${Colors.slateGreyDarker} 0%, ${Colors.slateGreyDark} 90%)`,
    color1: Colors.slateGreyDarker,
    color2: Colors.slateGreyDark,
  },
  gradientBlackDitherDown:  {
    background: `linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 5%,  rgba(0,0,0,0) 100%)`,
    // background: `linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)`,
    color1: Colors.black,
    color2: 'rgba(0,0,0,0)',
  },
  gradientDarkerGrey:  {
    background: `linear-gradient(120deg, ${Colors.lightGrey} 0%, ${Colors.grey} 100%)`,
    color1: Colors.lightGrey,
    color2: Colors.grey,
  },
  gradientDarkGrey:  {
    background: `linear-gradient(120deg, ${Colors.slateGreyLightBlack} 0%, ${Colors.charcoal} 80%)`,
    color1: Colors.slateGreyLightBlack,
    color2: Colors.charcoal,
  },
  gradientUniswapDark:  {
    background: `linear-gradient(140deg, ${Colors.gradientUniswapDark1} 20%, ${Colors.gradientUniswapDark2} 80%)`,
    color1: Colors.gradientUniswapDark1,
    color2: Colors.gradientUniswapDark2,
  },
  gradientUniswapDark2:  {
    background: `linear-gradient(180deg , ${Colors.uniswapDarkNavy} 30%, ${Colors.uniswapNavy} 90%)`,
    color1: Colors.uniswapDarkNavy,
    color2: Colors.uniswapNavy,
  },
  gradientUniswapDarkRotated:  {
    background: `linear-gradient(240deg, ${Colors.gradientUniswapDark1} 20%, ${Colors.gradientUniswapDark2} 80%)`,
    color1: Colors.gradientUniswapDark1,
    color2: Colors.gradientUniswapDark2,
  },
  gradientUniswapFluro:  {
    background: `linear-gradient(120deg, ${Colors.gradientUniswapFluro1} 20%, ${Colors.gradientUniswapFluro2} 80%)`,
    color1: Colors.gradientUniswapFluro1,
    color2: Colors.gradientUniswapFluro2,
  },
  gradientUniswapFluro2:  {
    background: `linear-gradient(120deg, ${Colors.gradientUniswapFluro1} 20%, ${Colors.gradientUniswapPurple} 50%, ${Colors.gradientUniswapFluro1} 80%)`,
    color1: Colors.gradientUniswapFluro1,
    color2: Colors.gradientUniswapFluro2,
  },
  gradientSnackBlueMagenta:  {
    background: `linear-gradient(90deg, ${Colors.gradientUniswapBlue1} 50%, rgb(146, 89, 240, 0.8) 100%)`,
    color1: Colors.blue,
    color2: "rgb(146, 89, 240, 0.8)",
  },
  gradientSnackRedMagenta:  {
    background: `linear-gradient(90deg, ${Colors.red} 50%, rgb(206, 69, 88, 0.8)  100%)`,
    color1: Colors.red,
    color2: 'rgb(206, 69, 88, 0.8)',
  },
  gradientSnackBlack:  {
    background: `linear-gradient(110deg, ${Colors.uniswapDarkNavy} 50%, rgb(40, 50, 80, 0.8) 100%)`,
    color1: Colors.uniswapDarkNavy,
    color2: 'rgb(40, 50, 80, 0.8)',
  },
  gradientUniswapBlue:  {
    background: `linear-gradient(140deg, ${Colors.gradientUniswapBlue1} 20%, ${Colors.gradientUniswapFluro2} 80%)`,
    color1: Colors.gradientUniswapBlue1,
    color2: Colors.gradientUniswapFluro2,
  },
  gradientUniswapBlue2:  {
    background: `linear-gradient(120deg, ${Colors.gradientUniswapBlue1} 20%, ${Colors.gradientUniswapFluro2} 50%, ${Colors.gradientUniswapBlue1} 80%)`,
    color1: Colors.gradientUniswapBlue1,
    color2: Colors.gradientUniswapFluro2,
  },
  gradientUniswapBlueGreen:  {
    background: `linear-gradient(140deg, ${Colors.gradientUniswapBlue1} 30%, ${Colors.gradientUniswapGreen} 90%)`,
    color1: Colors.gradientUniswapBlue1,
    color2: Colors.gradientUniswapGreen,
  },
  gradientUniswapBlueGreen2:  {
    background: `linear-gradient(120deg, ${Colors.gradientUniswapGreen} 30%, ${Colors.gradientUniswapBlueGreen} 50%, ${Colors.gradientUniswapGreen} 70%)`,
    color1: Colors.gradientUniswapBlueGreen,
    color2: Colors.gradientUniswapGreen,
  },
  gradientRainbow: {
    webkitTextFillColor: 'transparent',
    background: `
      linear-gradient(110.78deg,
        rgb(118, 230, 80) -1.13%,
        rgb(249, 214, 73) 15.22%,
        rgb(240, 142, 53) 32.09%,
        rgb(236, 81, 87) 48.96%,
        rgb(255, 24, 189) 67.94%,
        rgb(26, 75, 255) 85.34%,
        rgb(98, 216, 249) 99.57%)
    `,
    '-webkit-background-clip': 'text',
    'background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    '-webkit-box-decoration-break': 'clone',
  },
  gradientRainbow2: {
    background: `linear-gradient(92.05deg, #BCA1F7 12.09%, #E577B4 42.58%, #FF7170 84.96%)`,
    webkitTextFillColor: 'transparent',
    '-webkit-background-clip': 'text',
    'background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    '-webkit-box-decoration-break': 'clone',
  }
}

export const BoxShadows = {
  shadow1: {
    boxShadow: '0 1px 1px rgba(0,0,0,0.1),0 2px 4px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
  },
  shadow2: {
    boxShadow: `
      0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048),
      0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.072),
      0 41.8px 33.4px rgba(0, 0, 0, 0.086),
      0 100px 80px rgba(0, 0, 0, 0.12)
    `
  },
  shadow3: {
    boxShadow: '0 1px 1px rgba(0,0,0,0.1),0 4px 4px rgba(0,0,0,0.1),0 0 0 1px rgba(0,0,0,0.02)',
  },
  shadow4: {
    boxShadow: `rgb(0 0 0 / 12%) 0px 6px 16px` // airbnb shadows
  },
  shadow5: {
    boxShadow: `rgba(0, 0, 0, 0.15) 0px 16px 32px, rgba(0, 0, 0, 0.1) 0px 3px 8px`,
    // airbnb shadows
  },
  shadowStart: {
    boxShadow: '0 6px 8px 4px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.2),0 0 0 1px rgba(0,0,0,0.02)',
  },
  shadowInset: {
    boxShadow: 'inset 3.53813px 3.53813px 7.07626px rgba(70,77,85,.4), inset -2.35875px -2.35875px 7.07626px #15171a',
  },
  shadowWhite: {
    boxShadow: '0 2px 4px rgba(250,250,250,0.15), 0 4px 8px rgba(250,250,250,0.1), 0 0 0 2px rgba(250,250,250,0.05)',
  },
  shadowWhite2: {
    boxShadow: `rgba(245, 245, 245, 0.10) 0px 16px 32px, rgba(245, 245, 245, 0.1) 0px 3px 8px`,
  },
}

export const breakpoints: Breakpoints = {
  xs: 0,
  sm: 416, // sm: 376,
  md: 480,
  lg: 720,
  xl: 900,
}

export interface Breakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export type ScreenSizes = "xs" | "sm" | "md" | "lg" | "xl";

export const BorderRadius = 8;
export const BorderRadius2x = 16;
export const BorderRadius3x = 24;
export const BorderRadius4x = 32;
export const BorderRadius5x = 48;


export const fontFam = [
  "Roobert TRIAL",
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
].join(',')


export const notifyStyles = (theme: Theme) => createStyles({
  variantSuccess: {
    borderRadius: BorderRadius4x,
    // border: `2px solid ${Colors.ultramarineBlue}`,
    border: `2px solid ${Colors.slateGrey}`,
    background: `${Gradients.gradientSnackBlueMagenta.background} !important`,
    color: `${Colors.slateGrey} !important`,
    '& > [class*="SnackbarItem-action"]': {
      "& > button > span > svg": {
        fill: `${Colors.slateGrey} !important`,
      }
    },
  },
  variantError: {
    borderRadius: BorderRadius4x,
    // border: `2px solid ${Colors.lightRed}`,
    border: `2px solid ${Colors.slateGrey}`,
    background: `${Gradients.gradientSnackRedMagenta.background} !important`,
    color: `${Colors.slateGrey} !important`,
    '& > [class*="SnackbarItem-action"]': {
      "& > button > span > svg": {
        fill: `${Colors.slateGrey} !important`,
      }
    },
  },
  variantInfo: {
    borderRadius: BorderRadius4x,
    // border: `2px solid ${Colors.black}`,
    border: `2px solid ${Colors.slateGrey}`,
    background: `${Gradients.gradientSnackBlack.background} !important`,
    color: `${Colors.slateGrey} !important`,
    '& > [class*="SnackbarItem-action"]': {
      "& > button > span > svg": {
        fill: `${Colors.slateGrey} !important`,
      }
    },
  },
  variantWarning: {
    borderRadius: BorderRadius4x,
    // border: `2px solid ${Colors.yellow}`,
    border: `2px solid ${Colors.slateGrey}`,
    backgroundColor: `${Colors.yellow} !important`,
    color: `${Colors.slateGrey} !important`,
    '& > [class*="SnackbarItem-action"]': {
      "& > button > span > svg": {
        fill: `${Colors.slateGrey} !important`,
      }
    },
  },
  // Styles applied to Snackbar's root element.
  // root: {
  // },
  // Styles applied to SnackbarContainer's root element.
  // containerRoot: {
  // },
});

/// To be used in: createMuiTheme(AppTheme)
/// in _app.tsx
export const createAppTheme = (darkModeStr: "dark"|"light"): ThemeOptions =>  {
  let darkMode = darkModeStr === 'dark'
  return {
    colors: {
      uniswapLightestGrey: darkMode ? '#B4B5BB' : "#222",
      uniswapLightGrey: darkMode ? '#C4C5CB' : "#222",
      uniswapLighterGrey: darkMode ? '#6D7283' : "#222",
      uniswapGrey: darkMode ? '#41444E' : "#222",
      uniswapMediumGrey: darkMode ? '#65666D' : "#222",
      uniswapLightNavy: darkMode ? '#3A3F4A' : "#222",
      uniswapNavy: darkMode ? '#2E3443' : "#222",
      uniswapMediumNavy: darkMode ? '#2D2F36' : "#222",
      uniswapGreyNavy: darkMode ? '#282A31' : "#222",
      uniswapDarkNavy: darkMode ? "#222429" : "#222",
      ...Colors,
    },
    gradients: {
      ...Gradients
    },

    palette: {
      // type: true ? 'dark' : 'light',

      primary: {
        main: darkMode ? Colors.uniswapLightestGrey : Colors.black,
      },
      secondary: {
        // main: '#EB365D'
        // main: Colors.red,
        main: Colors.secondary,
      }, // red/pinkk
      // secondary: { main: '#65BF93' }, // green
      error: { main: '#D92F20' },
      background: {
        // CANNOT BE A linear-gradient background
        // default: Gradients.gradientUniswapDark.background,
        default: darkMode ? Colors.uniswapDarkNavy : Colors.cream,
        paper: darkMode ? Colors.uniswapDarkNavy : Colors.cream,
      },
    },
    typography: {
      fontSize: 16,
      fontFamily: fontFam,
    },
    breakpoints: {
      values: breakpoints
    },
    overrides: {
      // a: {
      //   textDecoration: "none"
      // },
      MuiMenuItem: {
        root: {
          color: Colors.uniswapLighterGrey,
          "&:hover": {
            backgroundColor: darkMode
              ? `rgba(72, 72, 72, 0.24)`
              : `rgba(72, 72, 72, 0.24)`,
          },
        }
      },
      MuiIconButton: {
        root: {
          '&$disabled': {
            backgroundColor: darkMode
              ? Colors.uniswapLightNavy
              : Colors.slateGreyDarker,
          }
        }
      },
      MuiButton: {
        // Name of the rule
        root: {
          minWidth: '40px',
          textTransform: 'none',
          color: darkMode ? Colors.uniswapLightestGrey : Colors.black,
          borderRadius: BorderRadius3x,
          "&:hover": {
            backgroundColor: darkMode
              ? `rgba(240, 240, 240, 0.20)`
              : `rgba(140, 140, 140, 0.20)`,
          },
        },
        text: {
          fontSize: '0.9rem',
          fontWeight: 600,
          // Some CSS
          // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          // borderRadius: 4,
          // border: 0,
        },
        label: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '0.9rem',
          fontWeight: 600,
        },
        textPrimary: {
          color: darkMode ? Colors.uniswapLightestGrey : Colors.black,
          "&:hover": {
            backgroundColor: darkMode
              ? `rgba(240, 240, 240, 0.20)`
              : `rgba(200, 200, 200, 0.20)`,
          },
        },
        contained: {
          '&$disabled': {
            // backgroundColor:
            // backgroundColor: darkMode
            //   ? Colors.uniswapMediumGrey
            //   : Colors.slateGreyDarkest
          },
        },
        containedPrimary: {
          "&:hover": {
            color: "#fafafa",
            backgroundColor: "#383838",
          }
        },
        containedSecondary: {
          color: "#fafafa",
          // backgroundColor: '#65BF93', // green
          backgroundColor: Colors.secondary,
          "&:hover": {
            color: Colors.cream,
            // backgroundColor: "#75CFA3",
            // backgroundColor: '#65CFA3', // green
            // backgroundColor: fade(Colors.red, 0.9), // red/pink
            backgroundColor: Colors.secondaryBright,
          }
        },
      },
      MuiInput: {
        root: {
          fontSize: '1rem',
        },
        underline: {
          "&:before": {
            borderBottom: darkMode
              ? `1px solid ${Colors.uniswapGrey}`
              : `1px solid ${Colors.uniswapLightestGrey}`,
          },
          "&&&&:hover:before": {
            borderBottom: darkMode
              ? `1px solid ${Colors.uniswapLighterGrey}`
              : `1px solid ${Colors.uniswapLightestGrey}`,
          },
          "&:after": {
            borderBottom: darkMode
              ? `1px solid ${Colors.uniswapGrey}`
              : `1px solid ${Colors.uniswapLightestGrey}`,
            // borderBottomColor: `${Colors.red} !important`,
          },
        },
      },
      MuiInputLabel: {
        root: {
          fontSize: '0.8rem',
        }
      },
      MuiInputBase: {
        root: {
          color: darkMode ? Colors.uniswapLighterGrey : Colors.black,
          // "&:hover": {
          //   borderBottom: `1px solid ${Colors.uniswapGrey}`,
          // },
        }
      },
      MuiFormLabel: {
        root: {
          color: darkMode ? Colors.uniswapLighterGrey : Colors.black,
        }
      },
      MuiSvgIcon: {
        root: {
          height: '1.25rem',
          width: '1.25rem',
          // fill: darkMode ? Colors.uniswapLightestGrey : Colors.black,
        }
      },
      MuiBadge: {
        anchorOriginTopRightRectangle: {
          transform: 'scale(0.8) translate(50%, -50%)'
        }
      },
      MuiDialog: {
        paperWidthXs: {
          maxWidth: '100%',
        },
        paperWidthSm: {
          maxWidth: '100%',
        },
        paperWidthMd: {
          maxWidth: '100%',
        },
        container: {
          backdropFilter: "blur(2px)",
        },
      },
      MuiTouchRipple: {
        root: {
          // backgroundColor: '#00ff00'
        },
        child: {
          backgroundColor: '#A5BFD5'
        },
        ripple: {
          // backgroundColor: '#ff0000'
        },
        rippleVisible: {
          // backgroundColor: '#222222'
        },
        ripplePulsate: {
          // backgroundColor: '#888888'
        },
        childLeaving: {
          backgroundColor: '#46597A'
        },
        childPulsate: {
          backgroundColor: '#00ff00'
        },
        // https://material-ui.com/api/touch-ripple/#css
      },
      MuiSwitch: {
        thumb: {
          // backgroundColor: darkMode ? Colors.uniswapLightNavy : Colors.darkWhite,
          backgroundColor: darkMode ? Colors.uniswapLightNavy : Colors.slateGrey,
        },
        track: {
          backgroundColor: darkMode
            ? Colors.mediumGrey
            : Colors.slateGreyDark,
          "$checked$checked + &": {
            opacity: 1.0,
            // backgroundColor: "rgb(129, 171, 134)" // Light green, aka #74d77f
            backgroundColor: darkMode
              ? Colors.purple
              : Colors.blue,
          }
        }
      },
      MuiPaper: {
        root: {
          backgroundColor: darkMode ? Colors.uniswapDarkNavy : Colors.cream,
          color: darkMode ? Colors.uniswapLighterGrey : Colors.charcoal,
        },
      },
      MuiTablePagination: {
        root: {
          color: darkMode ? Colors.uniswapLighterGrey : Colors.charcoal,
        },
      },
      MuiTableCell: {
        head: {
          color: darkMode ? Colors.uniswapLighterGrey : Colors.charcoal,
        },
        root: {
          borderBottom: darkMode
            ? `1px solid ${Colors.uniswapLightNavy}`
            : `1px solid ${Colors.uniswapLightestGrey}`,
          padding: 4,
        },
      },
      MuiStepLabel: {
        label: {
          color: Colors.uniswapMediumGrey,
        },
      },
      MuiStepIcon: {
        text: {
          fill: darkMode ? Colors.uniswapMediumGrey : Colors.cream,
        },
      },
      MuiTypography: {
        h1: {
          fontSize: "2rem",
          fontWeight: 700,
          lineHeight: 1.5,
          color: darkMode ? Colors.uniswapLightestGrey : Colors.black,
        },
        h2: {
          fontSize: "1.5rem",
          fontWeight: 700,
          lineHeight: 1.5,
          color: darkMode ? Colors.uniswapLightestGrey : Colors.black,
        },
        h3: {
          fontSize: "1.25rem",
          fontWeight: 600,
          lineHeight: 1.25,
          color: darkMode ? Colors.uniswapLightestGrey : Colors.black,
        },
        h4: {
          fontSize: "1.125rem",
          fontWeight: 600,
          lineHeight: 1.25,
          color: darkMode ? Colors.uniswapLightestGrey : Colors.black,
        },
        h5: {
          fontSize: "1rem",
          fontWeight: 600,
          lineHeight: 1.25,
          color: darkMode ? Colors.uniswapLightestGrey : Colors.black,
        },
        h6: {
          fontSize: "0.875rem",
          fontWeight: 700,
          lineHeight: 1.25,
          color: darkMode ? Colors.uniswapLightestGrey : Colors.black,
        },
        body1: {
          fontSize: "1rem",
          fontWeight: 400,
          lineHeight: 1.25,
          color: darkMode ? Colors.uniswapLightestGrey : Colors.black,
        },
        body2: {
          fontSize: "0.875rem",
          fontWeight: 400,
          lineHeight: 1.25,
          color: darkMode ? Colors.uniswapLightestGrey : Colors.black,
        },
        subtitle1: {
          fontSize: "1.125rem",
          fontWeight: 500,
          lineHeight: 1,
          color: darkMode ? Colors.uniswapLightestGrey : Colors.black,
        },
        subtitle2: {
          fontSize: "1rem",
          fontWeight: 400,
          lineHeight: 0.9,
          color: darkMode ? Colors.uniswapLightestGrey : Colors.black,
        },
        caption: {
          fontSize: "0.7rem",
          fontWeight: 500,
          lineHeight: 0.9,
          color: darkMode ? Colors.uniswapLightestGrey : Colors.black,
        },
      }
    }
}
}
