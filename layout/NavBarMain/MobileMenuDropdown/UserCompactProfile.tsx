import React from "react";
// Graphql
import { UserPrivate, StorePrivate, ID } from "typings/gqlTypes";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors } from "layout/AppTheme";
import clsx from "clsx";
// Components
import Loading from "components/Loading";
import ErrorBounds from 'components/ErrorBounds';
// Material UI
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';
import { logout } from "queries/requests";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useApolloClient } from "@apollo/client";



const UserCompactProfile: React.FC<ReactProps> = (props) => {

  const {
    classes,
    user,
  } = props;
  // imgloaded
  const router = useRouter();
  const dispatch = useDispatch();
  const apolloClient = useApolloClient();

  let userLicense = user?.defaultLicense

  return (
    <ErrorBounds className={clsx(classes.container)}>
      <div className={clsx(classes.flexRow, classes.userMargin)}>
        <div className={classes.flexCol}>
          <Typography variant="body1" className={classes.profileTitle}>
            {
              (userLicense?.firstName && userLicense?.lastName)
                ? `${userLicense.firstName} ${userLicense.lastName}`
                : user?.email ?? "Your Profile"
            }
          </Typography>
          <Typography variant="caption" className={classes.profileEmail}>
            {user?.email}
          </Typography>
        </div>
      </div>
      <div className={classes.flexRow}>
        <div
          className={clsx(classes.logout)}
          onClick={() => {
            logout(apolloClient, dispatch)(router.pathname)
          }}
        >
          Log Out
        </div>
      </div>
    </ErrorBounds>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate;
}


const styles = (theme: Theme) => createStyles({
  container: {
    margin: "1rem 0rem",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  avatar: {
    height: 40,
    width: 40,
    marginRight: '0.5rem',
    border: `1px solid ${Colors.charcoal}`,
  },
  profileTitle: {
    fontWeight: 600,
    marginBottom: '0.25rem',
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.black,
  },
  profileEmail: {
    fontWeight: 400,
    fontSize: '0.7rem',
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.darkGrey,
  },
  logout: {
    fontSize: '0.9rem',
    marginRight: '1rem',
    fontWeight: 500,
    // color: Colors.uniswapLightNavy,
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.charcoal,
    cursor: 'pointer',
    "&:hover": {
      color: Colors.blue,
    },
  },
  userMargin: {
    marginLeft: '0.5rem',
    marginBottom: '0.5rem',
  },
});

export default withStyles(styles)( UserCompactProfile );
