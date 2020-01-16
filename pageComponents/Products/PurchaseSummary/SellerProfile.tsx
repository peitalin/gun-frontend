import * as React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Router
import Link from "next/link";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
import { Product, Store } from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import { Colors } from "layout/AppTheme";



const SellerProfile = (props: ReactProps) => {

  const { classes, store } = props;
  const [imgLoaded, setImgLoaded] = React.useState(false);

  return (
    <div className={classes.sellerProfile}>
      <div className={classes.flexRow}>
        <Link
          href="/stores/[storeId]"
          as={`/stores/${option(store).id()}`}
        >
          <a>
          {
            imgLoaded
            ? <Avatar
                className={clsx(
                  classes.avatar,
                  imgLoaded ? "fadeInFast" : "hidden"
                )}
                src={option(store).profile.original.url()}
                imgProps={{ onLoad: () => setImgLoaded(true) }}
              />
            : <Avatar
                className={classes.avatar}
              >{option(store).name("").charAt(0)}</Avatar>
          }
          </a>
        </Link>
        <Link
          href="/stores/[storeId]"
          as={`/stores/${option(store).id()}`}
        >
          <a className={classes.flexCol}>
            <Typography
              className={classes.storeName}
              color={"primary"}
              variant="body2"
            >
              {option(store).name()}
            </Typography>
          </a>
        </Link>
      </div>
    </div>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  store: Store;
}

const styles = (theme: Theme) => createStyles({
  sellerProfile: {
    padding: '0.5rem 0rem',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  avatar: {
    height: 30,
    width: 30,
    fontSize: '0.8rem',
    marginRight: '0.5rem',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23aaaaaa' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    backgroundColor: `${Colors.backgroundColor}`,
    color: `${theme.palette.primary.light}`,
    border: `1px solid ${theme.palette.primary.light}`,
    transition: theme.transitions.create(['border','color'], {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
    "&:hover": {
      color: `${theme.palette.secondary.light}`,
      textDecoration: 'none',
      border: `1px solid ${theme.palette.secondary.light}`,
      transition: theme.transitions.create(['border', 'color'], {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      })
    }
  },
  storeName: {
    "&:hover": {
      textDecoration: `underline solid ${theme.palette.secondary.light}`,
      color: theme.palette.secondary.light,
    },
  },
});

export default withStyles(styles)( SellerProfile );


