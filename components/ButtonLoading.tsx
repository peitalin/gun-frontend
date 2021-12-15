
import React from 'react';
import clsx from "clsx";
import { Theme, alpha } from '@mui/material/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, isThemeDark } from "layout/AppTheme";
import Loading from "components/Loading"
import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";



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
    //   backgroundColor: fade(Colors.ultramarineBlue, 0.9),
    // },
  },
});

export default withStyles(styles)(ButtonLoading);
