import React from "react";
import {
  UserPrivate,
  SavedSearchHit,
  SavedSearchHitsConnection,
} from "typings/gqlTypes";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius2x, isThemeDark } from "layout/AppTheme";
// MUI
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import ProductPreviewCardRowSmall from "components/ProductPreviewCardRowSmall";

import Badge from '@material-ui/core/Badge';

import {
  GET_SAVED_SEARCH_HITS_BY_USER
} from "queries/saved-search-queries";
// css
import { useSnackbar } from "notistack"


// Router
import Link from "next/link";
import Hidden from "@material-ui/core/Hidden";
import { useLazyQuery } from "@apollo/client"
import LoadingBar from "components/LoadingBar";
import MarkHitAsSeenButton from "pageComponents/SavedSearches/MarkHitAsSeenButton"



export const NotificationsMenu: React.FC<ReactProps> = (props) => {

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleCloseMenu = () => {
    setAnchorEl(null);
  }

  const { classes, color } = props;

  const snackbar = useSnackbar()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const limit = 8

  const [
    getSavedSearchHits,
    savedSearchHitsResponse,
  ] = useLazyQuery<SearchHitsQData, SearchHitsQVar>(
    GET_SAVED_SEARCH_HITS_BY_USER, {
      variables: {
        limit: limit,
        offset: 0,
        unseenOnly: true,
      },
      onCompleted: (data) => { },
      onError: (e) => { },
  })


  React.useEffect(() => {
    getSavedSearchHits()
  }, [])

  let savedSearchHitsEdges = savedSearchHitsResponse?.data?.getSavedSearchHitsByUser?.edges
  let numHits = savedSearchHitsEdges?.length
  let loading = savedSearchHitsResponse?.loading


  return (
    <>
      <Hidden smDown implementation="css">
        <Button
          className={props.className}
          classes={{
            label: classes.navbarButtonLabel
          }}
          onClick={handleClickMenu}
          aria-controls="notifications-menu"
          aria-haspopup="true"
        >
          <NotificationsIcon style={{ fill: color }}/>
          <Badge
            badgeContent={numHits}
            className={classes.badge}
            classes={{
              root: classes.badgeRoot
            }}
            color="secondary"
          >
          </Badge>
        </Button>
      </Hidden>
      <Hidden mdUp implementation="css">
        <Button
          className={props.className}
          onClick={handleClickMenu}
          aria-controls="user-menu"
          aria-haspopup="true"
        >
          <MenuIcon/>
        </Button>
      </Hidden>

      <Menu
        classes={{
          paper: classes.menu,
        }}
        style={{
          zIndex: 5005, // to be above modals
        }}
        id="user-menu"
        anchorEl={anchorEl}
        // anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        // anchorPosition={{ top: 80, left: 1200 }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >

        {
          loading &&
          <LoadingBar
            height={"4px"}
            width={"100%"}
          />
        }

        <div className={classes.title}>
          Saved Search Notifications
        </div>

        {
          savedSearchHitsEdges?.map(({ node: hit }) => {

            let externalLink = hit.externalProduct?.sourceSiteUrl
            let productId = hit.product?.id

            let make = hit.product?.currentSnapshot?.make
              ?? hit.externalProduct?.currentExternalProductSnapshot?.make
            let model = hit.product?.currentSnapshot?.model
              ?? hit.externalProduct?.currentExternalProductSnapshot?.model
            let caliber = hit.product?.currentSnapshot?.caliber
              ?? hit.externalProduct?.currentExternalProductSnapshot?.caliber

            let featuredPreviewItem = hit?.product?.featuredVariant?.previewItems?.[0]
              ?? hit?.externalProduct?.currentExternalProductSnapshot?.previewItems?.[0]

            console.log('hit: ', hit.seen)

            return (
              <MenuItem className={classes.menuItem} onClick={handleCloseMenu}>
                {
                  externalLink
                  ? <a className={classes.menuLink}
                      href={externalLink}
                      target={"_blank"}
                    >
                      <ProductPreviewCardRowSmall
                        previewItem={featuredPreviewItem}
                          height={40}
                          width={60}
                          style={{
                            minWidth: 60,
                            minHeight: 40,
                          }}
                      />
                      <div className={classes.textBox}>
                        <span className={classes.menuText1}>
                          {`${make}`}
                        </span>
                        <span className={classes.menuText2}>
                          {`${model} ${caliber}`}
                        </span>
                      </div>
                    </a>
                  : <Link href={"/p/[productId]"} as={`/p/${productId}`}>
                      <a className={classes.menuLink} target={"_blank"}>
                        <ProductPreviewCardRowSmall
                          previewItem={featuredPreviewItem}
                          height={40}
                          width={60}
                          style={{
                            minWidth: 60,
                            minHeight: 40,
                          }}
                        />
                        <div className={classes.textBox}>
                          <span className={classes.menuText1}>
                            {`${make}`}
                          </span>
                          <span className={classes.menuText2}>
                            {`${model} ${caliber}`}
                          </span>
                        </div>
                      </a>
                    </Link>
                }

                {/* <MarkHitAsSeenButton
                  searchHitId={hit.id}
                  isSeen={hit.seen}
                  limit={limit}
                  offset={0}
                  style={{
                    right: '0.5rem',
                  }}
                  toolTip={false}
                /> */}
              </MenuItem>
            )
          })
        }

        <MenuItem className={classes.menuItem} onClick={handleCloseMenu}>
          <Link href="/saved-search">
            <a className={classes.menuLink}>
              <span className={classes.menuText3}> See More </span>
            </a>
          </Link>
        </MenuItem>

      </Menu>
    </>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
  color?: string;
  className?: any;
}
interface ReduxProps {
  user: UserPrivate;
}

interface SearchHitsQData {
  getSavedSearchHitsByUser: SavedSearchHitsConnection
}
interface SearchHitsQVar {
  limit?: number
  offset?: number
  unseenOnly?: boolean
}
interface MData {
  markSavedSearchHitsAsSeen: SavedSearchHit[]
}
interface MVar {
  savedSearchHitsIds: string[]
}


/////////////// STYLES /////////////////////

const styles = (theme: Theme) => createStyles({
  iconText: {
    marginRight: '0.5rem',
  },
  title: {
    textAlign: 'center',
    padding: '0.5rem',
    fontWeight: 600,
    fontSize: '1rem',
    width: '100%',
  },
  menu: {
    padding: 0,
    top: "3rem !important",
    right: 0,
    width: 300,
    borderRadius: BorderRadius2x,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.slateGrey,
  },
  z5001: {
    zIndex: 5001,
  },
  navbarButtonLabel: {
    height: '100%',
    paddingLeft: '0.25rem',
    paddingRight: '0.25rem',
  },
  menuText1: {
    color: isThemeDark(theme)
      ? Colors.lightPurple
      : Colors.ultramarineBlueLight,
    fontSize: '0.9rem',
    fontWeight: 600,
    // ellipsis
    width: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  menuText2: {
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.black,
    fontSize: '0.9rem',
    // ellipsis
    width: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  menuText3: {
    color: isThemeDark(theme)
      ? Colors.purple
      : Colors.ultramarineBlue,
    fontSize: '0.9rem',
    fontWeight: 600,
    // ellipsis
    width: '100%',
    textAlign: 'center',
  },
  menuIcon: {
    marginRight: "0.5rem",
    color: isThemeDark(theme)
      ? Colors.lightGrey
      : Colors.black,
  },
  menuItem: {
    padding: '0.5rem',
    "&:hover": {
      backgroundColor: isThemeDark(theme)
        ? Colors.uniswapNavy
        : Colors.slateGreyDarker,
      color: Colors.cream,
    },
  },
  menuLink: {
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  darkModeToggle: {
    position: 'absolute',
    top: 0,
    right: '1rem',
  },
  textBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    overflow: "hidden",
    width: "calc(100% - 60px)",
    marginLeft: '0.5rem',
  },
  badge: {
    paddingBottom: "0.1rem",
  },
  badgeRoot: {
    top: '0.75rem',
  },
});


export default withStyles(styles)( NotificationsMenu );

