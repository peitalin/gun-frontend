import React from "react";
import { useState, useEffect } from "react";
import { oc as option } from "ts-optchain";
// Graphql
// import { Store, StorePrivate, UserPrivate, ID } from "typings/gqlTypes";
type StorePrivate = any;

// Styles
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import clsx from "clsx";
// Components
import Loading from "components/Loading";
import ErrorBounds from 'components/ErrorBounds';
// Material UI
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import { logout } from "queries/requests";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useApolloClient } from "@apollo/react-hooks";



const StorePage: React.FC<ReactProps> = (props) => {

  const { userStore: store, classes } = props;
  // imgloaded
  const [avatarImgLoaded, setAvatarImgLoaded] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const apolloClient = useApolloClient();

  return (
    <ErrorBounds className={clsx(classes.container)}>
      <div className={classes.flexRow}>
        <Avatar
          className={clsx(
            classes.avatar,
            avatarImgLoaded ? "fadeInFast" : "hidden",
          )}
          src={option(store).profile.original.url()}
          onLoad={() => setAvatarImgLoaded(true)}
        />
        <div className={classes.flexCol}>
          <Typography variant="caption" className={classes.profileText}>
            {
              store && store.name &&
              store.name
            }
          </Typography>
          <Typography variant="caption" className={classes.profileText}>
            {
              store && store.website &&
              store.website
            }
          </Typography>
        </div>
      </div>
      <div className={classes.flexRow}>
        <div
          className={clsx(classes.link, classes.logout)}
          onClick={() => logout(apolloClient, dispatch)(router.pathname)}
        >
          logout
        </div>
      </div>
    </ErrorBounds>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  userStore: StorePrivate;
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
  link: {
    color: Colors.blue,
    cursor: 'pointer',
    "&:hover": {
      color: Colors.lightBlue,
    },
  },
  profileText: {
    fontWeight: 600,
    color: Colors.darkGrey,
  },
  logout: {
    fontSize: '0.9rem',
    marginRight: '1rem',
    fontWeight: 600,
  },
});

export default withStyles(styles)( StorePage );
