import React from 'react';
import { Theme } from '@mui/material/styles';
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors } from "layout/AppTheme";
import clsx from "clsx";

import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';


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
    if (props.absolute) {
      return props.classes.rootAbsolute
    }
    if (props.fixed) {
      return props.classes.rootFixed
    } else {
      return props.classes.rootInline
    }
  }

  const {
    classes,
    delay,
    width = 40,
    height = 40,
    loading = true,
  } = props;
  const color = props.color || Colors.gradientUniswapBlue1;

  if (!loading) {
    return <span className={classes.placeholder}/>;
  } else {
    return (
      <div className={selectLoaderStyle(props)}>
        <div style={{
          height: height,
          width: width,
        }}>
          {
            delay
            ? <Fade
                in={loading}
                style={{ transitionDelay: loading ? delay : '0ms' }}
                unmountOnExit
              >
                <CircularProgress style={{
                  color: color,
                  height: height,
                  width: width,
                }}/>
              </Fade>
            : <CircularProgress style={{
                color: color,
                height: height,
                width: width,
              }}/>
          }
        </div>
      </div>
    );
  }
}

interface ReactProps extends WithStyles<typeof styles> {
  inline?: boolean;
  fixed?: boolean;
  absolute?: boolean,
  loading?: boolean;
  delay?: string;
  color?: string;
  height?: any
  width?: any
}

const styles = (theme: Theme) => createStyles({
  rootFullScreen: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: `calc(100vh - ${theme.spacing(8)})`,
    // offset is 64px (topbar) + 64px (footer: theme.spacing.unit * 8)
    // but keep footer below the fold while loading this time
  },
  rootInline: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  rootFixed: {
    position: 'fixed',
    right: theme.spacing(9),
    bottom: `calc(${theme.spacing(8)})`,
    // unit * 6 = height of foot, then add 2 * unit for padding
  },
  rootAbsolute: {
    position: 'absolute',
    right: theme.spacing(9),
    bottom: `calc(${theme.spacing(8)})`,
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
