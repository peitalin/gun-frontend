import React, { useState } from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles";
import { Colors, BoxShadows, combineStyles } from "layout/AppTheme";
// components
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CardMedia from "@material-ui/core/CardMedia";
// Redux
import { useDispatch, useSelector } from "react-redux";
import StoreOrLogin from "pageComponents/ProductCreate/StoreOrLogin";
import { UserPrivate } from "typings/gqlTypes";
// Redux
import { GrandReduxState } from "reduxStore/grand-reducer";




const StartSelling12 = ({ classes }: ReactProps) => {

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  const { user } = useSelector<GrandReduxState, ReduxState>(state => {
    return {
      user: option(state).reduxLogin.user(),
    }
  });


  return (
    <div className={clsx(classes.section12Root)}>
      <div className={clsx(classes.section12, classes.flexCol)}>

        <div className={clsx(classes.section12Container, classes.flexCol)}>

          <Typography className={
            mdDown ? classes.s12HeadingMobile : classes.s12Heading
          }>
            Ready to earn?
          </Typography>

          <div className={classes.s12ProductCreateLinkButtonContainer}>
            <StoreOrLogin
              className={classes.storeOrLoginClass}
              classNameButtonRoot={classes.storeOrLoginClassButtonRoot}
              classNameButtonLabel={classes.storeOrLoginClassButtonLabel}
              user={user}
              buttonText={"Open a Shop"}
              disableSubtitle={true}
              disableLoginButton={true}
              showProductCreateButtonIfLoggedIn={true}
              biggerButtons={true}
            />
          </div>

        </div>

      </div>
    </div>
  );
};


interface ReactProps extends WithStyles<typeof styles> {}

interface ReduxState {
  user: UserPrivate;
}


export const styles = (theme: Theme) => createStyles({
  section12Root: {
    paddingTop: '8rem',
    paddingBottom: '8rem',
    position: "relative",
  },
  section12: {
  },
  flexCol:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  s12PreHeading: {
    fontWeight: 600,
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    color: Colors.red,
  },
  s12Heading: {
    fontWeight: 800,
    fontSize: '2.75rem',
    marginBottom: '1rem',
    color: Colors.black,
  },
  s12HeadingMobile: {
    fontWeight: 800,
    fontSize: '2rem',
    marginBottom: '1rem',
    color: Colors.black,
  },
  s12Subheading: {
    fontWeight: 600,
    fontSize: '1.25rem',
    margin: '1.25rem',
    color: Colors.black,
  },
  s12bulletContainer:{
    textAlign: 'start',
  },
  s12ProductCreateLinkButtonContainer: {
    width: '100%',
    marginTop: '1rem',
    // marginBottom: '1rem',
  },
  section12Container: {
    maxWidth: '720px',
    position: 'relative',
    paddingBottom: '1rem',
    paddingTop: '1rem',
  },
  section12Background: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  section12Dither: {
    background: "rgba(0,0,0,0.75)",
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  storeOrLoginClass: {
    justifyContent: 'center',
  },
  storeOrLoginClassButtonRoot: {
    width: '220px',
    height: 50,
  },
  storeOrLoginClassButtonLabel: {
    fontSize: '1.125rem',
    fontWeight: 700,
  },
})

export default withStyles(styles)(StartSelling12);
