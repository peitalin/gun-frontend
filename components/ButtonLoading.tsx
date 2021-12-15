
import React from 'react';
import clsx from "clsx";
import {
  withStyles, createStyles, Theme, alpha
} from '@material-ui/core/styles';
import { Colors, isThemeDark } from "layout/AppTheme";
import Loading from "components/Loading"
import Button from '@material-ui/core/Button';
import { ButtonProps } from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";



const ButtonLoading: React.FC<ReactProps & ButtonProps> = (props) => {

  const {
    loading,
    replaceTextWhenLoading = true,
    loadingIconSize = 18,
    loadingIconColor = Colors.secondaryBright,
    ...ButtonProps
  } = props;

  if (replaceTextWhenLoading) {
    return (
      <Button
        // default props
        variant={props.variant ? props.variant : "contained"}
        classes={{
          root: clsx(
            props.classes.root,
            props.className,
          )
        }}
        style={props.style}
        // override default props
        {...ButtonProps}
      >
      {
        loading
        ? <span className={"fadeInFast"}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress
              style={{
                marginLeft: '0.5rem',
                color: loadingIconColor
              }}
              size={loadingIconSize}
            />
          </span>
        : <span className={"fadeInFast"}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {props.children}
          </span>
      }
      </Button>
    )
  } else {
    return (
      <Button
        // default props
        variant={props.variant ? props.variant : "contained"}
        classes={{
          root: clsx(
            props.classes.root,
            props.className,
          )
        }}
        style={props.style}
        // override default props
        {...ButtonProps}
      >
      {
        loading
        ? <span className={"fadeInFast"}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {props.children}
            <CircularProgress
              style={{
                marginLeft: '0.5rem',
                color: loadingIconColor
              }}
              size={loadingIconSize}
            />
          </span>
        : <span className={"fadeInFast"}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {props.children}
          </span>
      }
      </Button>
    )
  }
}

interface ReactProps {
  loading?: boolean;
  replaceTextWhenLoading?: boolean;
  loadingIconSize?: number;
  loadingIconColor?: string;
  variant?: "outlined" | "text" | "contained";
  style?: any;
  [key: string]: any;
}

const styles = (theme: Theme) => createStyles({
  root: {
    width: "100%",
    // maxWidth: 200,
    height: "40px",
    fontWeight: 500,
    // backgroundColor: Colors.ultramarineBlue,
    // "&:hover": {
    //   backgroundColor: alpha(Colors.ultramarineBlue, 0.9),
    // },
  },
});

export default withStyles(styles)(ButtonLoading);
