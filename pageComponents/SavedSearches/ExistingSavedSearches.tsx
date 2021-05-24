import React from 'react';
// Styles
import {
  Colors,
  isThemeDark,
  Gradients,
  BorderRadius,
  BorderRadius2x,
  BorderRadius4x,
  BoxShadows,
} from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
// graphql
import { useMutation, useQuery } from '@apollo/client';
// typings
import {
  SavedSearchesConnection,
  Saved_Searches,
} from "typings/gqlTypes";
// components
import Typography from '@material-ui/core/Typography';
import SavedSearchItem from './SavedSearchItem';
// Snackbar
import { useSnackbar } from "notistack";
import {
  INSERT_SAVED_SEARCH,
  DELETE_SAVED_SEARCH,
} from "queries/saved-search-mutations";
import {
  GET_SAVED_SEARCHES_BY_USER,
} from "queries/saved-search-queries";




const ExistingSavedSearches: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const snackbar = useSnackbar();
  const [
    currentDeleteSavedSearchId,
    currentDeleteSavedSearchIdResponse,
  ] = React.useState(undefined)


  const [deleteSavedSearch, deleteSavedSearchResponse] = useMutation<MData3, MVar3>(
    DELETE_SAVED_SEARCH, {
      variables: {
        savedSearchId: undefined,
      },
      update: (cache, { data: { deleteSavedSearch }}) => {

        const cacheData = cache.readQuery<QData, QVar>({
          query: GET_SAVED_SEARCHES_BY_USER,
          variables: {},
        });
        console.log("cacheData:", cacheData)
        console.log("deleteSavedSearch:", deleteSavedSearch)

        cache.writeQuery({
          query: GET_SAVED_SEARCHES_BY_USER,
          variables: {},
          data: {
            getSavedSearchesByUser: {
              __typename: cacheData?.getSavedSearchesByUser?.__typename,
              totalCount: cacheData?.getSavedSearchesByUser?.totalCount,
              edges: cacheData?.getSavedSearchesByUser?.edges.filter(
                edge => edge.node.id !== deleteSavedSearch?.id
              ),
            }
          },
        });
      },
      onCompleted: () => {
        snackbar.enqueueSnackbar(
          `Search deleted.`,
          { variant: "success" }
        )
        currentDeleteSavedSearchIdResponse(undefined)
      },
      onError: (e) => {
        snackbar.enqueueSnackbar(
          `Error deleting search: ${e}`,
          { variant: "error" }
        )
        currentDeleteSavedSearchIdResponse(undefined)
      },
  })

  const { data, loading, error } = useQuery<QData, QVar>(
    GET_SAVED_SEARCHES_BY_USER, {
      variables: { },
      onCompleted: (data) => {
      },
      onError: (e) => {
        snackbar.enqueueSnackbar(
          `Error getting saved searches: ${e}`,
          { variant: "error" }
        )
      },
  })

  return (
    <div className={classes.flexCol}>
      <Typography variant="h4" className={classes.title}>
        Existing Saved Searches
      </Typography>
      {
        data?.getSavedSearchesByUser?.edges?.map(({ node: savedSearch }) => {
          return (
            <SavedSearchItem
              key={savedSearch.id}
              onClickDelete={() => {
                currentDeleteSavedSearchIdResponse(savedSearch.id)
                deleteSavedSearch({
                  variables: {
                    savedSearchId: savedSearch.id
                  }
                })
              }}
              isHighlighted={false}
              searchTerm={savedSearch.searchTerm}
              categorySlug={savedSearch.categorySlug}
              caliber={savedSearch.caliber}
              dealerState={savedSearch.dealerState}
              loading={
                deleteSavedSearchResponse?.loading
                && savedSearch.id === currentDeleteSavedSearchId
              }
              // loading={true}
            />
          )
        })
      }
    </div>
  )
}




interface ReactProps extends WithStyles<typeof styles> {
}

interface QData {
  getSavedSearchesByUser: SavedSearchesConnection
}
interface QVar {
  limit?: number
  offset?: number
}

interface MData3 {
  deleteSavedSearch: Saved_Searches
}
interface MVar3 {
  savedSearchId?: string
}


const styles = (theme: Theme) => createStyles({
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '0.5rem',
    width: '100%',
  },
  title: {
    marginTop: "1.25rem",
    fontSize: "1.25rem",
    marginBottom: '0.5rem',
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
  },
});


export default withStyles(styles)( ExistingSavedSearches );
