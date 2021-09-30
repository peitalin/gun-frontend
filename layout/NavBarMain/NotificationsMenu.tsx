import React from "react";
import {
  UserPrivate,
  SavedSearchHit,
  SavedSearchHitsConnection,
} from "typings/gqlTypes";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius2x, isThemeDark, BorderRadius, BoxShadows } from "layout/AppTheme";
// MUI
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import ProductPreviewThumb from "components/ProductPreviewThumb";
import ProductPreviewThumbCategory from "components/ProductPreviewThumbCategory";

import Badge from '@material-ui/core/Badge';

import {
  GET_SAVED_SEARCH_HITS_BY_USER
} from "queries/saved-search-queries";
// css
import { useSnackbar } from "notistack"
import { useApolloClient } from "@apollo/client";
import { printRelativeTime } from "utils/dates";

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

  const client = useApolloClient()

  const limit = 8
  const offset = 0
  const unseenOnly = true

  const [
    getSavedSearchHits,
    savedSearchHitsResponse,
  ] = useLazyQuery<SearchHitsQData, SearchHitsQVar>(
    GET_SAVED_SEARCH_HITS_BY_USER, {
      variables: {
        limit: limit,
        offset: offset,
        unseenOnly: unseenOnly,
      },
      onCompleted: (data) => { },
      onError: (e) => { },
  })


  React.useEffect(() => {
    getSavedSearchHits()
  }, [anchorEl])

  let savedSearchHitsEdges = savedSearchHitsResponse?.data?.getSavedSearchHitsByUser?.edges
  let cacheData = client.cache.readQuery<SearchHitsQData, SearchHitsQVar>({
    query: GET_SAVED_SEARCH_HITS_BY_USER,
    variables: {
      limit: limit,
      offset: offset,
      unseenOnly: unseenOnly
    },
  })

  let numHits = (cacheData?.getSavedSearchHitsByUser?.edges ?? [])
    .filter(edge => edge?.node?.id).length
  ?? (savedSearchHitsEdges ?? [])
    .filter(edge => edge?.node?.id).length

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

        <div className={classes.innerContainer}>

          {
            loading &&
            <LoadingBar
              height={"4px"}
              width={"100%"}
            />
          }

          <div className={classes.titleBox}>
            <div className={classes.title}>
              Saved Search Notifications
            </div>
            <Link href={"/saved-searches"}>
              <a>
                <IconButton
                  className={classes.settingsIcon}
                  // onClick={props.closeModal}
                  size={"medium"}
                >
                  <SettingsIcon
                    style={{ fill: color }}
                    className={classes.settingsIcon}
                  />
                </IconButton>
              </a>
            </Link>
          </div>

          {
            (savedSearchHitsEdges ?? [])
            .filter(edge => edge?.node?.id)
            .map(( edge, i ) => {

              let hit = edge?.node
              let externalLink = hit?.externalProduct?.sourceSiteUrl
              let productId = hit?.product?.id

              let make = hit?.product?.currentSnapshot?.make
                ?? hit?.externalProduct?.currentExternalProductSnapshot?.make
              let model = hit?.product?.currentSnapshot?.model
                ?? hit?.externalProduct?.currentExternalProductSnapshot?.model
              let caliber = hit?.product?.currentSnapshot?.caliber
                ?? hit?.externalProduct?.currentExternalProductSnapshot?.caliber

              let createdAt = hit?.product?.currentSnapshot?.createdAt
                ?? hit?.externalProduct?.currentExternalProductSnapshot?.createdAt

              let featuredPreviewItem = hit?.product?.featuredVariant?.previewItems?.[0]
                ?? hit?.externalProduct?.currentExternalProductSnapshot?.previewItems?.[0]

              let categoryId = hit?.product?.categoryId
                ?? hit?.externalProduct?.categoryId

              // console.log('hit: ', hit?.seen)

              return (
                <div className={classes.menuItemOuter} key={hit?.id ?? i}>
                  <MenuItem className={classes.menuItem} onClick={handleCloseMenu}>
                    {
                      externalLink
                      ? <a className={classes.menuLink}
                          href={externalLink}
                          target={"_blank"}
                        >
                          {
                            featuredPreviewItem
                            ? <ProductPreviewThumb
                                previewItem={featuredPreviewItem}
                                  height={40}
                                  width={60}
                                  style={{
                                    minWidth: 60,
                                    minHeight: 40,
                                  }}
                              />
                            : <ProductPreviewThumbCategory
                                categoryId={categoryId}
                                width={60}
                                height={40}
                              />
                          }
                          <div className={classes.textBox}>
                            <span className={classes.menuText1}>
                              {`${make}`}
                            </span>
                            <span className={classes.menuText2}>
                              {`${model} ${caliber}`}
                            </span>
                            <span className={classes.menuText4}>
                              {`${printRelativeTime(createdAt)}`}
                            </span>
                          </div>
                        </a>
                      : <Link href={"/p/[productId]"} as={`/p/${productId}`}>
                          <a className={classes.menuLink} target={"_blank"}>
                            <ProductPreviewThumb
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
                              <span className={classes.menuText4}>
                                {`${printRelativeTime(createdAt)}`}
                              </span>
                            </div>
                          </a>
                        </Link>
                    }
                  </MenuItem>

                  <MarkHitAsSeenButton
                    searchHitId={hit.id}
                    isSeen={hit.seen}
                    toolTip={false}
                    // needed to update query cache connections
                    limit={limit}
                    offset={offset}
                    unseenOnly={unseenOnly}
                  />
                </div>
              )
            })
          }

          <MenuItem className={classes.menuItem2} onClick={handleCloseMenu}>
            <Link href="/saved-searches">
              <a className={classes.menuLink}>
                <span className={classes.menuText3}> See More </span>
              </a>
            </Link>
          </MenuItem>

        </div>

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

interface SearchHitsQData {
  getSavedSearchHitsByUser: SavedSearchHitsConnection
}
interface SearchHitsQVar {
  limit?: number
  offset?: number
  unseenOnly?: boolean
}





/////////////// STYLES /////////////////////

const styles = (theme: Theme) => createStyles({
  iconText: {
    marginRight: '0.5rem',
  },
  titleBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '0.5rem',
  },
  title: {
    textAlign: 'center',
    padding: '0.5rem',
    fontWeight: 600,
    fontSize: '1rem',
    width: '100%',
  },
  menu: {
    padding: '0rem 1rem',
    background: 'transparent',
    boxShadow: 'unset',
    top: "3.25rem !important",
    right: 0,
    width: 320,
    borderRadius: BorderRadius2x,
  },
  innerContainer: {
    // border: isThemeDark(theme)
      // ? `1px solid ${Colors.uniswapLightNavy}`
      // : `1px solid ${Colors.slateGreyDarkest}`,
    boxShadow: BoxShadows.shadow4.boxShadow,
    paddingTop: '1rem',
    borderRadius: BorderRadius2x,
    background: isThemeDark(theme)
      ? Colors.uniswapBlack
      : Colors.cream,
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
    fontSize: '0.7rem',
    fontWeight: 600,
    // ellipsis
    textTransform: 'uppercase',
    width: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  menuText2: {
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.black,
    fontSize: '0.8rem',
    fontWeight: 600,
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
  menuText4: {
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightBlack,
    fontSize: '0.7rem',
    fontWeight: 500,
  },
  menuIcon: {
    marginRight: "0.5rem",
    color: isThemeDark(theme)
      ? Colors.lightGrey
      : Colors.black,
  },
  menuItem: {
    padding: '0.5rem',
    overflow: "visible",
    "&:hover": {
      backgroundColor: isThemeDark(theme)
        ? Colors.uniswapNavy
        : Colors.slateGrey,
      color: Colors.cream,
    },
  },
  menuItem2: {
    borderRadius: `0px 0px ${BorderRadius2x}px ${BorderRadius2x}px`,
    padding: '0.5rem',
    overflow: "visible",
    "&:hover": {
      backgroundColor: isThemeDark(theme)
        ? Colors.uniswapNavy
        : Colors.slateGrey,
      color: Colors.cream,
    },
  },
  menuItemOuter: {
    position: "relative",
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
  settingsIcon: {
    // position: "absolute",
    // right: '1rem',
  },
});


export default withStyles(styles)( NotificationsMenu );

