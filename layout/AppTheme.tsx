
import { createMuiTheme, fade } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core/styles';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';


/// bright red
// const secondary = "#EB466D"

// pale red
// const secondary = "#DB3748"

// blue
const secondary = "#2484FF"

// green
// const secondary = "#65BF93"

export const Colors = {
  backgroundColor: "#f4f4f4",
  foregroundColor: "#fefefe",
  white: "#fefefe",
  cream: "#fafafa",
  darkWhite: "#F7F7F7",
  slateGrey: "#EDF0F2",
  slateGreyDark: "#E2E8ED",
  slateGreyDarker: "#D0D5DF",
  slateGreyDarkest: "#4A6476",
  slateGreyBlack: "#253848",
  secondary: secondary,
  secondaryBright: fade(secondary, 0.9),
  magenta: "#EB466D",
  purple: "#9991DB",
  lightPurple: "#B8B3E9",
  primary: "#191919",
  lightestGrey: "#f4f4f4",
  lightGrey: "#e8e8e8",
  mediumGrey: "#ccc",
  lightMediumGrey: "#bbb",
  mediumLightGrey: "#dadbdd", // Description Input grey, Fiverr grey lines
  ghostGrey: "#bbb",
  grey: "#aaa",
  darkerGrey: "#888",
  darkGrey55: "#555555",
  darkGrey: "#767676",
  charcoal: "#484848",
  lighterBlack: "#333333",
  black: "#111111",
  pitchBlack: "#000000",
  darkestRed: '#6A1617',
  darkerRed: '#7A1F27',
  darkRed: '#87212B',
  deepRed: "#922435",
  red: "#D83748",
  lightRed: "#DC848A",
  green: "#57BC7A",
  // green:'#6CBAA3',
  lightGreen: '#ABEABE',
  greenCool: "#419677",
  greenCoolLight:'#6CBAA3',
  blue: "#1DA1F3",
  lightBlue: '#479FF4',
  lightYellow: '#FADD8F',
  paleYellow: "#FCE8A6",
  yellow: '#EDC376',
  pink: "#DC848B",
  // gradient
  gradientPurple1: '#fbc2eb',
  gradientPurple2: '#a18cd1',
  gradientGrey1: '#fdfdfd',
  gradientGrey2: '#ebedee',
  gradientFlamingo1: '#f093fb',
  gradientFlamingo2: '#f5576c',
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
  gradientFlamingo:  {
    background: `linear-gradient(120deg, ${Colors.gradientFlamingo1} 0%, ${Colors.gradientFlamingo2} 100%)`,
    color1: Colors.gradientFlamingo1,
    color2: Colors.gradientFlamingo2,
  },
}

export const BoxShadows = {
  shadow1: {
    boxShadow: '0 1px 1px rgba(0,0,0,0.1),0 2px 4px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
  },
  shadow2: {
    boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
  },
  shadowLight: {
    boxShadow: '0 1px 1px rgba(0,0,0,0.05),0 2px 4px rgba(0,0,0,0.15),0 0 0 1px rgba(0,0,0,0.02)',
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

export const BorderRadius = 4;

export const fontFam = [
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
    primary: {
      // main: '#191919'
      main: Colors.charcoal,
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
    MuiButton: {
      // Name of the rule
      root: {
        minWidth: '40px',
        textTransform: 'none',
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
      containedPrimary: {
        "&:hover": {
          color: "#fafafa",
          backgroundColor: "#484848",
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
    MuiTypography: {
      h1: {
        fontSize: "2rem",
        fontWeight: 700,
        lineHeight: 1.5,
        color: Colors.charcoal,
      },
      h2: {
        fontSize: "1.5rem",
        fontWeight: 700,
        lineHeight: 1.5,
        color: Colors.charcoal,
      },
      h3: {
        fontSize: "1.25rem",
        fontWeight: 600,
        lineHeight: 1.25,
        color: Colors.charcoal,
      },
      h4: {
        fontSize: "1.125rem",
        fontWeight: 600,
        lineHeight: 1.25,
        color: Colors.charcoal,
      },
      h5: {
        fontSize: "1rem",
        fontWeight: 600,
        lineHeight: 1.25,
        color: Colors.charcoal,
      },
      h6: {
        fontSize: "0.875rem",
        fontWeight: 700,
        lineHeight: 1.25,
        color: Colors.charcoal,
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.25,
        color: Colors.charcoal,
      },
      body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.25,
        color: Colors.charcoal,
      },
      subtitle1: {
        fontSize: "1.125rem",
        fontWeight: 500,
        lineHeight: 1,
        color: Colors.charcoal,
      },
      subtitle2: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 0.9,
        color: Colors.charcoal,
      },
      caption: {
        fontSize: "0.7rem",
        fontWeight: 500,
        lineHeight: 0.9,
      },
    }
  },
});
