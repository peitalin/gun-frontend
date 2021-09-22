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
import ProductPreviewThumb from "components/ProductPreviewThumb";
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
import MarkHitAsSeenButton from "./MarkHitAsSeenButton"
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSnackbar } from "notistack"




const SearchHitsItem = (props: SearchHitsItemProps) => {

  const {
    classes,
    isSeen,
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

  const make = props?.make
    ? `"${props.make}"`
    : `-`

  const model = props?.model
    ? `"${props.model}"`
    : `-`

  const caliber = props?.caliber
    ? `"${props.caliber}"`
    : `-`

  return (
    <div className={clsx(
      mdDown
        ? classes.searchHitsContainerMobile
        : classes.searchHitsContainerDesktop,
      !isSeen
        ? classes.savedSearchBorderHighlight
        : classes.savedSearchBorder,
    )}>

      {
        props.externalLink
        ? <a className={classes.link} href={props.externalLink}>
            <ProductPreviewThumb
              previewItem={props.previewItem}
                width={90}
                height={60}
            />
          </a>
        : <Link href={"/p/[productId]"} as={`/p/${props.product?.id}`}>
            <a className={classes.link}>
              <ProductPreviewThumb
                previewItem={props.previewItem}
                width={90}
                height={60}
              />
            </a>
          </Link>
      }


      <div className={
        mdDown ? classes.savedSearchItemMobileFlexWrap : classes.savedSearchItemDesktop
      }>
        <div className={clsx(
          classes.flexItem,
          classes.productTitleColumn
        )}>
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
        <div className={classes.flexItem}>
          <div className={
            mdDown ? classes.savedSearchItemMobileFlexWrap : classes.savedSearchItemDesktop
          }>
            <span className={classes.boldText}>Search Terms</span>
          </div>
          <div className={
            mdDown ? classes.savedSearchItemMobileFlexWrap : classes.savedSearchItemDesktop
          }>
            <span className={classes.fieldText}>Make</span>
            <span className={classes.italicText}>
              {make}
            </span>
          </div>
          <div className={
            mdDown ? classes.savedSearchItemMobileFlexWrap : classes.savedSearchItemDesktop
          }>
            <span className={classes.fieldText}>Model</span>
            <span className={classes.italicText}>
              {model}
            </span>
          </div>
          <div className={
            mdDown ? classes.savedSearchItemMobileFlexWrap : classes.savedSearchItemDesktop
          }>
            <span className={classes.fieldText}>Caliber</span>
            <span className={classes.italicText}>
              {caliber}
            </span>
          </div>
        </div>
      </div>


      <MarkHitAsSeenButton
        searchHitId={props.searchHitId}
        isSeen={props.isSeen}
        limit={props.limit}
        offset={props.offset}
      />

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
  make: string
  model: string
  caliber: string
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
    borderRadius: BorderRadius,
    padding: '0.5rem 1rem 0.5rem 0.5rem',
    marginBottom: '0.5rem',
    // backgroundColor: isThemeDark(theme)
    //   ? Colors.uniswapMediumNavy
    //   : Colors.slateGrey,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.cream,
  },
  searchHitsContainerMobile: {
    position: "relative",
    display: 'flex',
    flexDirection: 'row',
    borderRadius: BorderRadius,
    padding: '0.5rem 1rem 0.5rem 0.5rem',
    marginBottom: '0.5rem',
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.cream,
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
      : BoxShadows.shadow3.boxShadow,
  },
  savedSearchItemDesktop: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: '0.5rem',
    flexWrap: "wrap",
    width: '100%',
  },
  savedSearchItemMobileFlexWrap: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: 80,
    marginRight: '0.5rem',
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  boldText: {
    fontWeight: 600,
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyBlack,
  },
  productTitleColumn: {
    // width: 150,
    width: '100%',
    minWidth: 200,
    marginBottom: '0.5rem',
  },
  flexItem: {
    flexBasis: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    wordBreak: "break-word",
    minWidth: 200,
  },
  italicText: {
    fontStyle: 'italic',
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
  },
  fieldText: {
    minWidth: 70,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
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


export default withStyles(styles)( SearchHitsItem );
