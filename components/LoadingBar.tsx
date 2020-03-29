import React from "react";
import clsx from 'clsx';
import { withStyles, WithStyles, createStyles, Theme, fade } from '@material-ui/core/styles';


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

const cssUnit: { [unit: string]: boolean } = {
  cm: true,
  mm: true,
  in: true,
  px: true,
  pt: true,
  pc: true,
  em: true,
  ex: true,
  ch: true,
  rem: true,
  vw: true,
  vh: true,
  vmin: true,
  vmax: true,
  "%": true
};


export function parseLengthAndUnit(size: number | string): LengthObject {
  if (typeof size === "number") {
    return {
      value: size,
      unit: "px"
    };
  }
  let value: number;
  let valueString: string = size.match(/^[0-9.]*/)!.toString();
  if (valueString.includes(".")) {
    value = parseFloat(valueString);
  } else {
    value = parseInt(valueString, 10);
  }

  let unit: string = size.match(/[^0-9]*$/)!.toString();

  if (cssUnit[unit]) {
    return {
      value,
      unit
    };
  }
  console.warn(`React Spinners: ${size} is not a valid css value. Defaulting to ${value}px.`);

  return {
    value,
    unit: "px"
  };
}

export function cssValue(value: number | string): string {
  let lengthWithunit: LengthObject = parseLengthAndUnit(value!);

  return `${lengthWithunit.value}${lengthWithunit.unit}`;
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







const Loading: React.FC<ReactProps> = (props) => {

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

  const { classes, loading, delay } = props;
  const color = props.color || "#242424";

  const style = (i: number): React.CSSProperties => {
    const { height } = props;
    return {
      'position': 'absolute',
      'height': `${cssValue(height!)}`,
      'overflow': `hidden`,
      'backgroundColor': `${color}`,
      'backgroundClip': 'padding-box',
      'display': 'block',
      'borderRadius': '2px',
      'willChange': 'left, right',
      'animationFillMode': 'forwards',
      // animation keyframes defined in globalStyles.tsx:
      // barloaderLong and barloaderShort
    }
  }

  const wrapper = (): React.CSSProperties => {
    const { width, height } = props;

    return {
      'position': 'relative',
      'width': `${cssValue(width!)}`,
      'height': `${cssValue(height!)}`,
      'overflow': 'hidden',
      'backgroundColor': `${fade(color, 0.2)}`,
      'backgroundClip': 'paddingBox',
    };
  };


  if (!loading) {
    return <span className={classes.placeholder}/>;
  } else {
    return (
      <div className={selectLoaderStyle(props)}>
        <div className={classes.loadingHeight}>
          <div style={wrapper()}>
            <div style={style(1)} className={"barloaderLong"}/>
            <div style={style(2)} className={"barloaderShort"}/>
          </div>
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
  },
  rootAbsoluteBottom: {
    position: 'absolute',
    bottom: 0,
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

export default withStyles(styles)(Loading);
