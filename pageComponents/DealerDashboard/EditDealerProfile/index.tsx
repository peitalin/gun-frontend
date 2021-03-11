import React from "react";
import clsx from "clsx";
// Styles
import { Colors, BorderRadius, BorderRadius2x, BoxShadows } from "layout/AppTheme";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
import { Dealers, UserPrivate } from "typings/gqlTypes";
// Material UI
import Button from "@material-ui/core/Button";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import EditDealerForm from "./EditDealerForm";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";



const EditDealerProfile = (props: ReactProps) => {

  const {
    classes,
    user,
  } = props;
  // CSS
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
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
      !smDown ? classes.minWidth500 : null,
    )}>
      <div className={classes.dealerEditMenu}>
        <EditDealerForm
          dealer={user?.dealer as any}
          closeEditDealerModal={undefined}
        />
      </div>
    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: '1rem',
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
  minWidth500: {
    minWidth: '500px',
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


export default withStyles(styles)( EditDealerProfile );





