import React from 'react';
// Styles
import {
  Colors,
  isThemeDark,
} from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// components
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from "@material-ui/icons/Check";
import Tooltip from "@material-ui/core/Tooltip";
import Loading from "components/Loading";
// typings
import {
  SavedSearchHit,
} from "typings/gqlTypes"
// graphql
import { useMutation, useQuery } from '@apollo/client';
import {
  MARK_SAVED_SEARCH_HITS_AS_SEEN
} from "queries/saved-search-mutations";
import {
  GET_SAVED_SEARCH_HITS_BY_USER
} from "queries/saved-search-queries";
import { SearchHitsQData, SearchHitsQVar } from "./SearchHits";
import { useSnackbar } from "notistack"

import {
  NOTIFICATIONS_OFFSET,
  NOTIFICATIONS_LIMIT,
} from "layout/NavBarMain/NotificationsMenu"




const MarketHitAsSeenButton = (props: MarketHitAsSeenButtonProps) => {

  const {
    classes,
    isSeen,
    toolTip = true,
  } = props

  const snackbar = useSnackbar()

  const [
    markSavedSearchAsSeen,
    { data, loading, error }
  ] = useMutation<MData, MVar>(
    MARK_SAVED_SEARCH_HITS_AS_SEEN, {
      variables: {
        savedSearchHitsIds: []
      },
      update: (cache, { data: { markSavedSearchHitsAsSeen } }) => {


        // for /saved-search page
        const cacheData1 = cache.readQuery<SearchHitsQData, SearchHitsQVar>({
          query: GET_SAVED_SEARCH_HITS_BY_USER,
          variables: props.unseenOnly === undefined
            ? {
                limit: props.limit,
                offset: props.offset,
              }
            : {
                limit: props.limit,
                offset: props.offset,
                unseenOnly: props.unseenOnly
              },
        });

        // for notifications menu
        const cacheDataNotifications = cache.readQuery<SearchHitsQData, SearchHitsQVar>({
          query: GET_SAVED_SEARCH_HITS_BY_USER,
          variables: {
            limit: NOTIFICATIONS_LIMIT,
            offset: NOTIFICATIONS_OFFSET,
            unseenOnly: true,
          },
        });

        // console.log("cacheData1:", cacheData1)
        // console.log("markSavedSearchHitsAsSeen:", markSavedSearchHitsAsSeen)

        let newSearchHits1 = cacheData1?.getSavedSearchHitsByUser?.edges
        if (newSearchHits1) {
          // for /saved-search page
          cache.writeQuery({
            query: GET_SAVED_SEARCH_HITS_BY_USER,
            variables: props.unseenOnly === undefined
              ? {
                  limit: props.limit,
                  offset: props.offset,
                }
              : {
                  limit: props.limit,
                  offset: props.offset,
                  unseenOnly: props.unseenOnly
              },
            data: {
              getSavedSearchHitsByUser: {
                ...cacheData1.getSavedSearchHitsByUser,
                edges: newSearchHits1,
              }
            },
          });
        }

        let newSearchHitsNotifications = cacheDataNotifications?.getSavedSearchHitsByUser?.edges?.filter(
          edge => {
            // remove seenSavedSearch from notifications menu
            return !markSavedSearchHitsAsSeen.find(seenHit => {
              let existingSavedSearchHit = edge?.node
              return existingSavedSearchHit?.id === seenHit.id
            })
          }
        )

        console.log("cacheDataNotifications:", cacheDataNotifications)
        console.log("newsSearchHitsNotifications:", newSearchHitsNotifications)
        // filter out seen items for /notifications menu

        if (newSearchHitsNotifications) {
          // for /notifications menu: unseenOnly = true
          cache.writeQuery({
            query: GET_SAVED_SEARCH_HITS_BY_USER,
            variables: {
              limit: NOTIFICATIONS_LIMIT,
              offset: NOTIFICATIONS_OFFSET,
              unseenOnly: true,
            },
            data: {
              getSavedSearchHitsByUser: {
                ...cacheDataNotifications.getSavedSearchHitsByUser,
                edges: newSearchHitsNotifications,
                // filter out seen items
              }
            },
          });
        }

      },
      onCompleted: (data) => {
      },
      onError: (e) => {
        snackbar.enqueueSnackbar(
          `Error marking saved search hits as seen: ${e}`,
          { variant: "error" }
        )
      },
  })

  if (toolTip) {
    return (
      <div className={clsx(classes.savedSearchItem5, props.className)}
        style={props.style}
      >
        {
          !isSeen &&
          // show button if button has not been marked as "seen"
          <Tooltip title={"Mark as seen"} placement="top">
            <IconButton
              className={classes.closeIcon}
              onClick={() => {
                markSavedSearchAsSeen({
                  variables: {
                    savedSearchHitsIds: [props.searchHitId]
                  }
                })
              }}
              size={"small"}
            >
              {
                loading
                ? <Loading/>
                : <CheckIcon/>
              }
            </IconButton>
          </Tooltip>
        }
      </div>
    )
  } else {
    return (
      <div className={clsx(classes.savedSearchItem5, props.className)}
        style={props.style}
      >
        {
          !isSeen &&
          // show button if button has not been marked as "seen"
          <IconButton
            className={classes.closeIcon}
            onClick={() => {
              markSavedSearchAsSeen({
                variables: {
                  savedSearchHitsIds: [props.searchHitId]
                }
              })
            }}
            size={"small"}
          >
            {
              loading
              ? <Loading/>
              : <CheckIcon/>
            }
          </IconButton>
        }
      </div>
    )
  }
}



interface MarketHitAsSeenButtonProps extends WithStyles<typeof styles> {
  searchHitId: string
  isSeen: boolean;
  limit: number
  offset: number
  className?: any;
  style?: any;
  toolTip?: boolean
  unseenOnly?: boolean
}

interface MData {
  markSavedSearchHitsAsSeen: SavedSearchHit[]
}
interface MVar {
  savedSearchHitsIds: string[]
}




const styles = (theme: Theme) => createStyles({
  savedSearchItem5: {
    position: 'absolute',
    top: 'calc(50% - 16px)', // iconButton height is 32px, divide by 2
    right: '-1rem',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-end",
    alignItems: "center",
  },
  closeIcon: {
    width: 32,
    height: 32,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapGrey
      : Colors.slateGreyDarker,
    "&:hover": {
      background: theme.palette.type === 'dark'
        ? Colors.uniswapMediumGrey
        : Colors.slateGreyDarkest,
    },
  },
  link: {
    marginRight: "0.5rem",
    textAlign: "start",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
    "&:hover": {
      color: Colors.ultramarineBlue,
    },
  },
});


export default withStyles(styles)( MarketHitAsSeenButton );
