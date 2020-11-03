
import { createMuiTheme, fade } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core/styles';


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
  slateGreyDarkest: "#4A6476",
  slateGreyBlack: "#253848",
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
  darkGrey55: "#555555",
  darkGrey: "#767676",
  charcoal: "#484848",
  lighterBlack: "#333333",
  mediumBlack: "#252525",
  black1A: "#1A1A1A",
  black: "#111111",
  pitchBlack: "#000000",
  // purples
  magenta: "#EB466D",
  purple: "#9991DB",
  lightPurple: "#B8B3E9",
  // red
  darkestRed: '#6A1617',
  darkerRed: '#7A1F27',
  darkRed: '#87212B',
  deepRed: "#922435",
  red: "#D83748",
  lightRed: "#DC848A",
  pink: "#DC848B",
  // green
  green: "#57BC7A",
  lightGreen: '#ABEABE',
  greenCool: "#419677",
  greenCoolLight:'#6CBAA3',
  // blue
  blue: "#1DA1F3",
  lightBlue: '#479FF4',
  blueLightNavy: "#6087A1",
  blueMinNavy: "#265371",
  blueDarkNavy: "#10334C",
  blueDarkerNavy: "#232830",
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
  gradientUniswapDark1: "#2E3545",
  gradientUniswapDark2: "#2D2F36",
  gradientUniswapFluro1: "#DC3078",
  gradientUniswapFluro2: "#5B4DBA",
  gradientUniswapPurple: "#8E4995",
  gradientUniswapBlue1: "#3773DE",
  gradientUniswapGreen: "#57BC7A",
  gradientUniswapBlueGreen: '#568DB3',
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
  gradientFlamingo:  {
    background: `linear-gradient(120deg, ${Colors.gradientFlamingo1} 0%, ${Colors.gradientFlamingo2} 100%)`,
    color1: Colors.gradientFlamingo1,
    color2: Colors.gradientFlamingo2,
  },
  gradientBlack:  {
    background: `linear-gradient(120deg, ${Colors.lighterBlack} 0%, ${Colors.black} 100%)`,
    color1: Colors.lighterBlack,
    color2: Colors.black,
  },
  gradientDarkerGrey:  {
    background: `linear-gradient(120deg, ${Colors.lightGrey} 0%, ${Colors.grey} 100%)`,
    color1: Colors.lightGrey,
    color2: Colors.grey,
  },
  gradientUniswapDark:  {
    background: `linear-gradient(140deg, ${Colors.gradientUniswapDark1} 20%, ${Colors.gradientUniswapDark2} 80%)`,
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
    background: `linear-gradient(140deg, ${Colors.gradientUniswapBlue1} 20%, ${Colors.gradientUniswapGreen} 80%)`,
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
    boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.2),0 0 0 1px rgba(0,0,0,0.02)',
  },
  shadow3: {
    boxShadow: '0 1px 1px rgba(0,0,0,0.1),0 4px 4px rgba(0,0,0,0.1),0 0 0 1px rgba(0,0,0,0.02)',
  },
  shadow4: {
    boxShadow: "0px 2px 10px 4px rgba(0,0,0,0.1)"
  },
  shadowStart: {
    boxShadow: '0 6px 8px 4px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.2),0 0 0 1px rgba(0,0,0,0.02)',
  },
  shadowInset: {
    boxShadow: 'inset 3.53813px 3.53813px 7.07626px rgba(70,77,85,.4), inset -2.35875px -2.35875px 7.07626px #15171a',
  }
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

export const fontFam = [
  "Roobert TRIAL",
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
].join(',')


export const notifyStyles = (theme: Theme) => createStyles({
  variantSuccess: {
    backgroundColor: Colors.blue,
  },
  variantError: {
    backgroundColor: Colors.red,
  },
  variantInfo: {
    backgroundColor: Colors.lighterBlack,
  },
  variantWarning: {
    backgroundColor: Colors.magenta,
  },
});


export const AppTheme = createMuiTheme({
  palette: {

    // type: darkMode ? 'dark' : 'light',

    primary: {
      main: Colors.uniswapLightestGrey,
    },
    secondary: {
      // main: '#EB365D'
      // main: Colors.red,
      main: Colors.secondary,
    }, // red/pink
    // secondary: { main: '#65BF93' }, // green
    error: { main: '#D92F20' },
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
          backgroundColor: `rgba(72, 72, 72, 0.24)`,
        },
      }
    },
    MuiButton: {
      // Name of the rule
      root: {
        minWidth: '40px',
        textTransform: 'none',
        color: Colors.uniswapLighterGrey,
        "&:hover": {
          backgroundColor: `rgba(72, 72, 72, 0.24)`,
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
        color: Colors.uniswapLighterGrey,
        "&:hover": {
          backgroundColor: `rgba(72, 72, 72, 0.24)`,
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
      }
    },
    MuiInputLabel: {
      root: {
        fontSize: '0.8rem',
      }
    },
    MuiSvgIcon: {
      root: {
        height: '1.25rem',
        width: '1.25rem',
        fill: Colors.uniswapLighterGrey,
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
        backgroundColor: Colors.uniswapLightNavy,
      }
    },
    MuiTypography: {
      h1: {
        fontSize: "2rem",
        fontWeight: 700,
        lineHeight: 1.5,
        color: Colors.uniswapLightestGrey,
      },
      h2: {
        fontSize: "1.5rem",
        fontWeight: 700,
        lineHeight: 1.5,
        color: Colors.uniswapLightestGrey,
      },
      h3: {
        fontSize: "1.25rem",
        fontWeight: 600,
        lineHeight: 1.25,
        color: Colors.uniswapLightestGrey,
      },
      h4: {
        fontSize: "1.125rem",
        fontWeight: 600,
        lineHeight: 1.25,
        color: Colors.uniswapLightestGrey,
      },
      h5: {
        fontSize: "1rem",
        fontWeight: 600,
        lineHeight: 1.25,
        color: Colors.uniswapLightestGrey,
      },
      h6: {
        fontSize: "0.875rem",
        fontWeight: 700,
        lineHeight: 1.25,
        color: Colors.uniswapLightestGrey,
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.25,
        color: Colors.uniswapLightestGrey,
      },
      body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.25,
        color: Colors.uniswapLightestGrey,
      },
      subtitle1: {
        fontSize: "1.125rem",
        fontWeight: 500,
        lineHeight: 1,
        color: Colors.uniswapLightestGrey,
      },
      subtitle2: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 0.9,
        color: Colors.uniswapLightestGrey,
      },
      caption: {
        fontSize: "0.7rem",
        fontWeight: 500,
        lineHeight: 0.9,
        color: Colors.uniswapLightestGrey,
      },
    }
  },
});
