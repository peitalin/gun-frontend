import React from 'react';
// Styles
import {
  Colors,
  isThemeDark,
} from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
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

        let newHits = markSavedSearchHitsAsSeen;

        const cacheData = cache.readQuery<SearchHitsQData, SearchHitsQVar>({
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
        console.log("cacheData:", cacheData)
        console.log("markSavedSearchHitsAsSeen:", markSavedSearchHitsAsSeen)

        let newSearchHits = cacheData?.getSavedSearchHitsByUser?.edges?.map(e => {

          if (e?.node?.id === newHits?.[0]?.id) {
            // remove the item you just marked as seen from connection
            return null
          } else {
            return e
          }
        }).filter(edge => !edge?.node?.seen)
        // filter out all seen items

        if (newSearchHits) {
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
                ...cacheData.getSavedSearchHitsByUser,
                edges: newSearchHits.filter(edge => edge?.node?.id),
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
