import React from 'react';
import {
  withStyles, WithStyles, createStyles, Theme
} from '@material-ui/core/styles';
import { Colors } from "layout/AppTheme";
import clsx from "clsx";

import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';


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
      return props.classes.rootFullScreen
    }
  }

  const {
    classes,
    delay,
    loading = true,
  } = props;
  const color = props.color || Colors.gradientUniswapBlue1;

  if (!loading) {
    return <span className={classes.placeholder}/>;
  } else {
    return (
      <div className={selectLoaderStyle(props)}>
        <div className={clsx(
          classes.loadingHeight,
          classes.loadingWidth
        )}>
          {
            delay
            ? <Fade
                in={loading}
                style={{ transitionDelay: loading ? delay : '0ms' }}
                unmountOnExit
              >
                <CircularProgress style={{ color: color }}/>
              </Fade>
            : <CircularProgress style={{ color: color }}/>
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
    // but keep footer below the fold while loading this time
  },
  rootInline: {
    width: '100%',
    padding: '1rem',
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
  rootAbsolute: {
    position: 'absolute',
    right: `${theme.spacing(9)}px`,
    bottom: `calc(${theme.spacing(8)}px)`,
  },
  loadingHeight: {
    height: 40,
  },
  loadingWidth: {
    width: 40,
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
