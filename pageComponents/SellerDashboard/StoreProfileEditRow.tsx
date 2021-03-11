import React from "react";
import { useState, useEffect } from "react";
import { oc as option } from "ts-optchain";
// Graphql
import { Store, StorePrivate, UserPrivate, ID } from "typings/gqlTypes";
// Styles
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import clsx from "clsx";
// Components
import Loading from "components/Loading";
import ErrorBounds from 'components/ErrorBounds';
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from '@material-ui/core/Avatar';
import { useRouter } from "next/router";
// Router
import EditSellerProfile from "./EditSellerProfile";


const StoreProfileEdit: React.FC<ReactProps> = (props) => {

  const { storePrivate: store, classes } = props;
  // imgloaded
  const [avatarImgLoaded, setAvatarImgLoaded] = useState(false);
  const router = useRouter();

  return (
    <ErrorBounds className={classes.root}>
      <div className={classes.container}>
        <div className={classes.flexRow}>
          <Avatar
            className={clsx(
              classes.avatar,
              // avatarImgLoaded ? "fadeInFast" : "hidden",
            )}
            src={option(store).profile.original.url()}
            // onLoad={() => setAvatarImgLoaded(true)}
          />
          <div className={classes.flexCol}>
            <Typography variant="caption" className={classes.profileText}>
              {option(store).name()}
            </Typography>
            <Typography variant="caption" className={classes.profileText}>
              {option(store).website()}
            </Typography>
          </div>
        </div>
        <div className={classes.flexRow}>
          <EditSellerProfile asModal={true}/>
        </div>
      </div>
    </ErrorBounds>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  storePrivate: StorePrivate;
}


const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0.5rem 0rem 0.5rem',
    marginTop: '1rem',
  },
  container: {
    width: '100%',
    padding: '0.5rem',
    // border: `1px solid ${Colors.lightGrey}`,
    borderRadius: '4px',
    // background: Colors.foregroundColor,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
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
  editProfileButton: {
    fontSize: '0.9rem',
    fontWeight: 600,
    minWidth: 150,
    color: Colors.charcoal,
  },
});

export default withStyles(styles)( StoreProfileEdit );
