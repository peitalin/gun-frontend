import React from "react";
import clsx from 'clsx';
import Fade from '@material-ui/core/Fade';
import { withStyles, WithStyles, createStyles, Theme, fade } from '@material-ui/core/styles';
import { isThemeDark, Colors } from "layout/AppTheme";
import { useTheme } from '@material-ui/core';


// NOTE: This LoadingBar has position: 'absolute'
// So it needs to be placed within a <div> that has position: 'relative' CSS style


export interface PrecompiledCss {
  name: string;
  styles: string;
}

interface CommonProps {
  color?: string;
  loading?: boolean;
  css?: string | PrecompiledCss;
}

export interface LengthObject {
  value: number;
  unit: string;
}

type LengthType = number | string;

export interface LoaderHeightWidthProps extends CommonProps {
  height?: LengthType;
  width?: LengthType;
}

export function heightWidthDefaults(
  height: number,
  width: number
): Required<LoaderHeightWidthProps> {
  return {
    loading: true,
    color: "#000000",
    css: "",
    height,
    width
  }
}



enum BasicColors {
  maroon = "#800000",
  red = "#FF0000",
  orange = "#FFA500",
  yellow = "#FFFF00",
  olive = "#808000",
  green = "#008000",
  purple = "#800080",
  fuchsia = "#FF00FF",
  lime = "#00FF00",
  teal = "#008080",
  aqua = "#00FFFF",
  blue = "#0000FF",
  navy = "#000080",
  black = "#000000",
  gray = "#808080",
  silver = "#C0C0C0",
  white = "#FFFFFF"
}

export const calculateRgba = (color: string, opacity: number): string => {
  if (Object.keys(BasicColors).includes(color)) {
    color = BasicColors[color as keyof typeof BasicColors];
  }

  if (color[0] === "#") {
    color = color.slice(1);
  }

  if (color.length === 3) {
    let res: string = "";
    color.split("").forEach((c: string) => {
      res += c;
      res += c;
    });
    color = res;
  }

  let rgbValues: string = color
    .match(/.{2}/g)!
    .map((hex: string) => parseInt(hex, 16))
    .join(", ");

  return `rgba(${rgbValues}, ${opacity})`;
};

const long = `
  0% {left: -35%;right: 100%}
  60% {left: 100%;right: -90%}
  100% {left: 100%;right: -90%}
`;

const short = `
  0% {left: -200%;right: 100%}
  60% {left: 107%;right: -8%}
  100% {left: 107%;right: -8%}
`;







const LoadingBar: React.FC<ReactProps> = (props) => {

  React.useEffect(() => {
    if (props.inline && props.fixed) {
      throw "Cannot use both `inline` and `fixed` props for <Loading/>"
    }
  }, [])

  const selectLoaderStyle = (props) => {
    if (props.inline) {
      return props.classes.rootInline
    }
    if (props.absoluteTop) {
      return props.classes.rootAbsoluteTop
    }
    if (props.absoluteBottom) {
      return props.classes.rootAbsoluteBottom
    }
    if (props.fixed) {
      return props.classes.rootFixed
    } else {
      return props.classes.rootFullScreen
    }
  }

  const {
    classes,
    delay,
    loading = true,
  } = props;

  let theme = useTheme()

  const color = props.color
    || isThemeDark(theme) ? Colors.purple : Colors.ultramarineBlue

  const style = (i: number): React.CSSProperties => {
    const { height } = props;
    return {
      'position': 'absolute',
      'height': height,
      'overflow': `hidden`,
      'backgroundColor': `${color}`,
      'backgroundClip': 'padding-box',
      'display': 'block',
      'borderRadius': '2px',
      'willChange': 'left, right',
      'animationFillMode': 'forwards',
      // animation keyframes defined in App.css:
      // barloaderLong and barloaderShort
    }
  }

  const wrapper = (): React.CSSProperties => {
    const { width, height } = props;

    return {
      'position': 'relative',
      'width': width,
      'height': height,
      'overflow': 'hidden',
      // 'backgroundColor': `${fade(color, 0.2)}`,
      'backgroundClip': 'paddingBox',
    };
  };


  if (!loading) {
    return <span className={classes.placeholder}/>;
  } else {
    return (
      <div className={selectLoaderStyle(props)} style={props.style}>
        <div className={classes.loadingHeight}>
          {
            delay
            ? <Fade
                in={loading}
                style={{ transitionDelay: loading ? delay : '0ms' }}
                unmountOnExit
              >
                <div style={wrapper()}>
                  {/* <div style={style(1)} className={"barloaderLong"}/> */}
                  <div style={style(2)} className={"barloaderShort"}/>
                </div>
              </Fade>
            : <div style={wrapper()}>
                {/* <div style={style(1)} className={"barloaderLong"}/> */}
                <div style={style(2)} className={"barloaderShort"}/>
              </div>
          }
        </div>
      </div>
    );
  }
}

interface ReactProps extends WithStyles<typeof styles> {
  inline?: boolean;
  fixed?: boolean;
  absoluteTop?: boolean,
  absoluteBottom?: boolean,
  loading?: boolean;
  delay?: string;
  color?: string;
  height: string | number;
  width: string | number;
  style?: any;
}

const styles = (theme: Theme) => createStyles({
  rootFullScreen: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: `calc(100vh - ${theme.spacing(8)}px)`,
    // offset is 64px (topbar) + 64px (footer: theme.spacing.unit * 8)
    // but keep footer below the fold while loading
  },
  rootInline: {
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  rootFixed: {
    position: 'fixed',
    right: `${theme.spacing(9)}px`,
    bottom: `calc(${theme.spacing(8)}px)`,
    // unit * 6 = height of foot, then add 2 * unit for padding
  },
  rootAbsoluteTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  rootAbsoluteBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  loadingHeight: {
    height: 4,
  },
  placeholder: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    zIndex: -10,
    // <Loading/> renders empty elem when not loading.
  },
});

export default withStyles(styles)(LoadingBar);
