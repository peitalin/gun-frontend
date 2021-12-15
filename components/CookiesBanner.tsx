import React from "react";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors } from "layout/AppTheme";

// redux
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { useSelector, useDispatch } from "react-redux";

// Utils Components
import Tick from "components/Icons/Tick";
// MUI
import Typography from "@mui/material/Typography";
// Subcomponents
import { UserPrivate } from "typings/gqlTypes";
import IconButtonCancel from "components/IconButtonCancel";
// CSS
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
export const MY_DOWNLOADS_PAGINATION_COUNT = 10;
import Link from "next/link";



const CookiesBanner = (props) => {

  const {
    classes,
  } = props;

  const dispatch = useDispatch();
  let user = useSelector<GrandReduxState, UserPrivate>(s => s.reduxLogin.user);

  const acceptCookies = () => {
  };

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('md'))
  const colorBg = Colors.black


  return (
    <div
      className={clsx(
        smDown ? classes.padding05 : classes.padding2,
        classes.cookiesAgreementRoot,
      )}
      style={{
        background: colorBg,
        position: "fixed",
        bottom: 0,
        zIndex: 2,
      }}
    >
      {
        smDown
        ? <Typography variant="body1"
            className={clsx(
              smDown ? classes.maxWidthSm : classes.maxWidthLg,
              classes.cookiesText,
            )}
          >
            We use cookies to improve your experience using this site.
            <Link href={"/sell"}>
              <a style={{ textDecoration: 'underline', color: Colors.white }}>
                More information.
              </a>
            </Link>
          </Typography>
        : <Typography variant="body1"
            className={clsx(
              smDown ? classes.maxWidthSm : classes.maxWidthLg,
              classes.cookiesText,
            )}
          >
            We use cookies to improve your experience using this site.
            <Link href={"/sell"}>
              <a style={{ textDecoration: 'underline', color: Colors.white }}>
                More information.
              </a>
            </Link>
          </Typography>
      }
      <IconButtonCancel
        onClick={acceptCookies}
        position={"left"}
      />
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  covid?: boolean;
}

const styles = (theme: Theme) => createStyles({
  cookiesAgreementRoot: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginBottom: '2rem',
    marginTop: '2rem',
  },
  cookiesText: {
    color: Colors.cream,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    size: '1rem',
  },
  textWhite: {
    color: Colors.cream,
  },
  textGrey: {
    color: Colors.lightGrey,
  },
  padding2: {
    padding: '2rem',
  },
  padding05: {
    padding: '0.75rem',
  },
  maxWidthSm: {
    maxWidth: '340px',
    lineHeight: '1.33rem',
  },
  maxWidthLg: {
    maxWidth: '460px',
    lineHeight: '1.33rem',
  },
  tick: {
    marginRight: '0.5rem',
  },
});


export default withStyles(styles)(CookiesBanner);
