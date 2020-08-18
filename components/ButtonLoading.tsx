
import React from 'react';
import {
  withStyles, WithStyles, createStyles, Theme
} from '@material-ui/core/styles';
import { Colors } from "layout/AppTheme";
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
        style={{
          width: "100%",
          height: "40px",
          fontWeight: 500,
        }}
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
        style={{
          width: "100%",
          height: "40px",
          fontWeight: 500,
        }}
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
  [key: string]: any;
}

const styles = (theme: Theme) => createStyles({
});

export default withStyles(styles)(ButtonLoading);
