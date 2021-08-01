import React from "react";
// Styles
import clsx from 'clsx';
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Colors, isThemeDark } from "layout/AppTheme";
import {
  logoBackgroundColorDark,
  logoBackgroundColorLight,
  logoBackgroundColorDark2,
  logoBackgroundColorLight2,
} from "../styles";



const TriangleSvg = (props: TriangleSvgProps) => {

  const {
    classes,
  } = props;

  return (
    <div className={classes.triangleBox}>
      {/* height of main navbar is 56px */}
      <svg height="64px" width="64px" className={classes.triangleSvg}>
        <polygon
          className={classes.trianglePolygon}
          points="4,0 44,64 4,64"
          style={props.style1}
        />
      </svg>
      <svg height="64px" width="64px" className={classes.triangleSvg2}>
        <polygon
          className={classes.trianglePolygon2}
          points="4,0 64,0 64,62 44,62"
          style={props.style2}
        />
      </svg>
    </div>
  )
}

interface TriangleSvgProps extends WithStyles<typeof styles> {
  style1?: any
  style2?: any
}


const styles = (theme: Theme) => createStyles({
  triangleBox: {
    width: '100%',
    // maxHeight: '56px',
    position: 'relative',
    overflow: "hidden",
  },
  triangleSvg: {
    height: '100%',
    // position: 'absolute',
    // top: 0,
    // left: 0,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  trianglePolygon: {
    fill: isThemeDark(theme)
      ? logoBackgroundColorDark
      : logoBackgroundColorLight,
    stroke: 'transparent',
    strokeWidth: 0,
  },
  triangleSvg2: {
    height: '100%',
  },
  trianglePolygon2: {
    fill: isThemeDark(theme)
      ? logoBackgroundColorDark2
      : logoBackgroundColorLight2,
    stroke: 'transparent',
    strokeWidth: 0,
  },
});

export default withStyles(styles)( TriangleSvg );
