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
// components
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from "@material-ui/icons/Check";
import Link from "next/link";
import ProductPreviewCardRowSmall from "components/ProductPreviewCardRowSmall";
import Tooltip from "@material-ui/core/Tooltip";
import Loading from "components/Loading";
// typings
import {
  SavedSearchHit,
  Product,
  Product_Preview_Items,
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
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSnackbar } from "notistack"




const SearchHitsItem = (props: SearchHitsItemProps) => {

  const {
    classes,
    isSeen,
    searchTerm,
    categorySlug,
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
          variables: {
            limit: props.limit,
            offset: props.offset,
          },
        });
        // console.log("cacheData:", cacheData)
        // console.log("markSavedSearchHitsAsSeen:", markSavedSearchHitsAsSeen)

        let newSearchHits = cacheData.getSavedSearchHitsByUser.edges.map(e => {
          let matchHit = newHits.find(h => h.id === e.node.id)

          if (matchHit) {
            return { node: matchHit }
          } else {
            return e
          }
        })

        cache.writeQuery({
          query: GET_SAVED_SEARCH_HITS_BY_USER,
          variables: {
            limit: props.limit,
            offset: props.offset,
          },
          data: {
            getSavedSearchHitsByUser: {
              ...cacheData.getSavedSearchHitsByUser,
              edges: newSearchHits,
            }
          },
        });
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

  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const productTitle = props.productTitle

  return (
    <div className={clsx(
      mdDown
        ? classes.searchHitsContainerMobile
        : classes.searchHitsContainerDesktop,
      isSeen
        ? classes.savedSearchBorderHighlight
        : classes.savedSearchBorder,
    )}>

      {
        props.externalLink
        ? <a className={classes.link} href={props.externalLink}>
            <ProductPreviewCardRowSmall
              previewItem={props.previewItem}
            />
          </a>
        : <Link href={"/p/[productId]"} as={`/p/${props.product?.id}`}>
            <a className={classes.link}>
              <ProductPreviewCardRowSmall
                previewItem={props.previewItem}
              />
            </a>
          </Link>
      }


      <div className={
        mdDown ? classes.savedSearchItemMobile : classes.savedSearchItemDesktop
      }>
        <span className={classes.boldText}>Product</span>
        {
          props.externalLink
          ? <a className={classes.link} href={props.externalLink}>
              <span className={classes.italicText}>{productTitle}</span>
            </a>
          : <Link href={"/p/[productId]"} as={`/p/${props.product?.id}`}>
              <a className={classes.link}>
                <span className={classes.italicText}>{productTitle}</span>
              </a>
            </Link>
        }
      </div>

      <div className={
        mdDown ? classes.savedSearchItemMobile : classes.savedSearchItemDesktop
      }>
        <span className={classes.boldText}>Search Term</span>
        <span className={classes.italicText}>"{searchTerm}"</span>
      </div>

      <div className={
        mdDown ? classes.savedSearchItemMobile : classes.savedSearchItemDesktop
      }>
        <span className={classes.boldText}>Category</span>
        <span className={classes.italicText}>{categorySlug ?? "all"}</span>
      </div>
      <div className={classes.savedSearchItem5}>
        {
          isSeen &&
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
    </div>
  )
}



interface SearchHitsItemProps extends WithStyles<typeof styles> {
  searchHitId: string
  product: Product
  previewItem: Product_Preview_Items
  productTitle: string
  externalLink?: string
  isSeen: boolean;
  searchTerm: string
  categorySlug?: string
  limit: number
  offset: number
}

interface MData {
  markSavedSearchHitsAsSeen: SavedSearchHit[]
}
interface MVar {
  savedSearchHitsIds: string[]
}




const styles = (theme: Theme) => createStyles({
  searchHitsContainerDesktop: {
    position: "relative",
    display: 'flex',
    flexDirection: 'row',
    borderRadius: BorderRadius2x,
    padding: '0.5rem 1rem 0.5rem 0.5rem',
    marginBottom: '0.5rem',
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
  },
  searchHitsContainerMobile: {
    position: "relative",
    display: 'flex',
    flexDirection: 'column',
    borderRadius: BorderRadius2x,
    padding: '0.5rem 1rem 0.5rem 0.5rem',
    marginBottom: '0.5rem',
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
  },
  savedSearchBorder: {
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapMediumGrey}`
      : `1px solid ${Colors.slateGreyDarkest}`,
  },
  savedSearchBorderHighlight: {
    border: isThemeDark(theme)
      ? `1px solid ${Colors.purple}`
      : `1px solid ${Colors.ultramarineBlue}`,
    boxShadow: isThemeDark(theme)
      ? BoxShadows.shadowWhite.boxShadow
      : BoxShadows.shadow4.boxShadow,
  },
  savedSearchItemDesktop: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minWidth: 100,
    marginRight: '0.5rem',
  },
  savedSearchItemMobile: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    minWidth: 80,
    marginRight: '0.5rem',
    justifyContent: "space-between",
  },
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
  boldText: {
    fontWeight: 600,
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyBlack,
  },
  italicText: {
    fontStyle: 'italic',
    textAlign: "center",
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
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
    "&:hover": {
      color: Colors.ultramarineBlue,
    },
  },
});


export default withStyles(styles)( SearchHitsItem );
