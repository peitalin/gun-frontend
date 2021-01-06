import React from "react";
import { useState } from "react";
import {oc as option} from "ts-optchain";
import { Colors } from "layout/AppTheme";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Material UI
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
// Utils
import { Image_Owners, Store } from "typings/gqlTypes";
// Following stores
import FollowStoreIcon from "components/FollowStoreIcon";
import { useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { genSrcSet, genImgBreakpoints } from "utils/images";



const SellerAvatarProfile = (props: ReactProps) => {

  const {
    classes,
    avatarBorderStyle,
    store
  } = props;

  const image = option(store).profile();
  // imgloaded
  const [avatarImgLoaded, setAvatarImgLoaded] = useState(false);
  const refetchUser = useSelector<GrandReduxState, () => void>(s => {
    return s.reduxRefetch.refetchUser
  })

  if (image) {
    return (
      <div className={classes.storeProfile}>
        <div className={classes.followStoreContainer}>
          <div className={classes.avatarBorder} style={{ ...avatarBorderStyle }}>
            <Avatar className={classes.avatar}>
              <img
                src={option(image).original.url()}
                srcSet={genSrcSet(image)}
                sizes={genImgBreakpoints({
                  xs: 100,
                  sm: 100,
                  md: 100,
                  lg: 100,
                  xl: 100,
                })}
                onLoad={() => setAvatarImgLoaded(true)}
                className={clsx(
                  classes.avatarImg,
                )}
              />
            </Avatar>
          </div>
          {/* <FollowStoreIcon
            storeId={store.id}
            refetch={refetchUser}
            style={{
              top: 'unset',
              bottom: '0.5rem',
              right: '0.5rem',
            }}
          /> */}
        </div>
        <Typography variant="h6" className={classes.name}>
          {store && store.name}
        </Typography>

        {
          option(store).bio() &&
          <Typography className={classes.bio} variant="body2">
            {store && store.bio}
          </Typography>
        }

        {
          option(store).website() &&
          <Typography variant="body2" className={classes.website}>
            <a href={store.website.startsWith("http") ? store.website : `https://${store.website}`}
              className={classes.websiteURL}
            >
              {store.website}
            </a>
          </Typography>
        }

      </div>
    );
  } else {
    return <></>
  }
}



interface ReactProps extends WithStyles<typeof styles> {
  store: Store;
  refetch?(): void; // apollo refetch
  avatarBorderStyle?: any;
}


const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: "0.5rem",
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  storeProfile: {
    display: "flex",
    // position: "absolute",
    top: 0,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    width: '100%',
    // maxWidth: "calc(100vw - 1rem)",
  },
  storeTranslateX: {
    left: "1rem",
  },
  name: {
    marginBottom: '0.5rem',
    fontSize: '1.25rem',
    textAlign: 'center',
  },
  website: {
    marginBottom: '0.5rem',
  },
  bio: {
    maxWidth: "400px",
    textAlign: 'center',
    marginBottom: '0.5rem',
  },
  // avatar outline circle
  avatar: {
    width: 98,
    height: 98,
  },
  avatarBorder: {
    borderRadius: '50%',
    background: Colors.grey,
    marginBottom: '0.5rem',
  },
  avatarEdit: {
    transform: "scale(1.2)",
    transition: theme.transitions.create('transform, border', {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
    border: "3px solid #fafafa",
    marginBottom: "1.5rem",
    "&:hover": {
      border: "3px solid #24A4FF",
      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      }),
    }
  },
  // avatar image
  avatarImg: {
    // make a little bigger to fit avatar
    objectFit: 'cover',
    height: "105%",
    width: "105%",
    transition: theme.transitions.create('filter', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
    backgroundColor: Colors.white,
  },
  websiteURL: {
    color: "#2484FF",
    textAlign: 'center',
  },
  cornerSaveButton: {
    position: 'absolute',
    right: '0rem',
    bottom: '3rem',
    padding: '1rem',
  },
  textField: {
    flexGrow: 1,
    minWidth: 300,
  },
  followStoreContainer: {
    position: 'relative',
  },
});


export default withStyles(styles)(SellerAvatarProfile);


