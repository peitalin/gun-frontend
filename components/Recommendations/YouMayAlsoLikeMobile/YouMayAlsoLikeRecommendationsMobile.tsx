import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import { col2MinWidth } from "../../../pageComponents/P/common";
import { BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
// Graphql
import {
  GET_RECOMMENDED_PRODUCTS,
} from "queries/products-queries";
// Typings
import { ProductsConnection, ConnectionQuery } from "typings/gqlTypes";
import { useQuery } from "@apollo/client";
// CSS
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import RenderProductRecommendations from "./RenderProductRecommendations";



const YouMayAlsoLikeRecommendationsMobile = (props: ReactProps) => {

  const {
    classes,
    index,
    setIndex,
  } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const {
    loading,
    error,
    data,
    refetch,
  } = useQuery<QueryData, QueryVar>(
    GET_RECOMMENDED_PRODUCTS, {
    variables: {
      // currentlyViewingProductIdOrSlug: props.currentlyViewingProductIdOrSlug,
      query: {
        limit: 12
      },
    },
    ssr: true,
  });

  const connection = option(data).getRecommendedProductsConnection();
  const products = connection;

  return (
    <RenderProductRecommendations
      index={index}
      setIndex={setIndex}
      products={products}
      error={error}
      currentlyViewingProductIdOrSlug={props.currentlyViewingProductIdOrSlug}
    />
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  index?: number;
  setIndex?(a?: any): void;
  currentlyViewingProductIdOrSlug?: string;
}
interface QueryData {
  getRecommendedProductsConnection: ProductsConnection
}
interface QueryVar {
  query: ConnectionQuery;
  currentlyViewingProductIdOrSlug?: string;
}


const styles = (theme: Theme) => createStyles({
  root: {
    minWidth: col2MinWidth, // 340px
    paddingTop: '1rem',
  },
  pageRecommendationsBox: {
    marginTop: '2rem',
    padding: '1rem',
  },
  productImage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 500,
    marginBottom: "0.5rem",
  },
  flexCol: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  flexItem: {
    // width: CARD_HEIGHT / 0.666, // 16:10
    // borderBottom: "1px solid #f7f7f7",
    borderRadius: BorderRadius,
  },
  paginateButtonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionRelative: {
    position: 'relative',
    width:'100%',
    paddingTop: '0.4rem',
    paddingBottom: '0.4rem',
  },
  productRecommendations: {
    // maxHeight: 580,
    // overflow: 'scroll',
  },
  marginHalf: {
    margin: '0rem 0.5rem',
  },
  margin1: {
    margin: '0rem 1rem',
  },
  noRecommendationsText: {
    width: '100%',
    textAlign: 'center',
    padding: '1rem',
    border: `1px solid ${Colors.lightGrey}`,
    borderRadius: '4px',
  },
});


export default withStyles(styles)( YouMayAlsoLikeRecommendationsMobile );







