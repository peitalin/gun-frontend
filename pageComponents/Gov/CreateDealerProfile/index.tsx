import React from "react";
import clsx from "clsx";
// Styles
import { Colors, BorderRadius, BorderRadius2x, BoxShadows } from "layout/AppTheme";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// Typings
import { Dealers, UserPrivate } from "typings/gqlTypes";
// Material UI
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import CreateDealerForm from "./CreateDealerForm";
// media query
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";



const CreateDealerProfile = (props: ReactProps) => {

  const {
    classes,
    user,
  } = props;
  // CSS
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('md'))
  const md = useMediaQuery(theme.breakpoints.only('md'))
  const lg = useMediaQuery(theme.breakpoints.only('lg'))
  const xlUp = useMediaQuery(theme.breakpoints.up('xl'))

  return (
    <ErrorBounds className={clsx(
      classes.root,
      classes.asPage,
      smDown && classes.paddingMobile,
      (md || lg) && classes.paddingIpad,
      xlUp && classes.paddingDesktop,
      !smDown && classes.minWidthA,
    )}>
      <div className={classes.dealerEditMenu}>
        <CreateDealerForm
          dealer={user?.dealer}
          setMenuOpen={props.setMenuOpen}
        />
      </div>
    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate
  setMenuOpen(b: boolean): void;
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: '1rem',
    padding: '0.5rem',
    width: '100%',
  },
  asPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dealerEditMenu: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  minWidthA: {
    minWidth: '350px',
  },
  paddingMobile: {
    paddingTop: '2rem',
  },
  paddingIpad: {
    paddingTop: '5rem',
  },
  paddingDesktop: {
    paddingTop: '2rem',
  },
});


export default withStyles(styles)( CreateDealerProfile );





