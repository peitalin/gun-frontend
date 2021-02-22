import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { Colors } from "layout/AppTheme";
import { withStyles, createStyles, WithStyles, makeStyles } from "@material-ui/core/styles";
// Typings
import { Product, ProductsConnection } from "typings/gqlTypes";
// Swipeable
import SwipeableViews from "components/Swiper/SwipeableViews";
import { virtualize, bindKeyboard } from 'react-swipeable-views-utils';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);
const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));
import AlignCenterLayout from "components/AlignCenterLayout";
import LoadingCards from "pageComponents/FrontPage/LoadingCards";
// helpers
import { noAnim, someAnim, GridMap } from "./GridPaginatorHelpers";
// Responsiveness
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  useEffectUpdateGridAccum,
} from "utils/hooksFacetSearch";
import { GenericConnection } from "typings";



function GridPaginatorGeneric<T>(props: ReactProps<T> & ReactChildren<T>) {

  const {
    index,
    connection,
    totalCount,
    setTotalCount,
    numItemsPerPage,
    overfetchBy = 1,
    maxWidth = 1160,
    disableAnimation = false,
  } = props;

  // console.log("connection.edges", connection)
  // console.log("index222: ", props.index)

  const classes = useStyles();
  const theme = useTheme();

  let productsGroupedInGrids = useEffectUpdateGridAccum({
    index,
    productsConnection: connection,
    totalCount,
    setTotalCount,
    numItemsPerPage,
  })

  let productGroups: T[][] = Object.values(productsGroupedInGrids)

  return (
    <AlignCenterLayout
      maxWidth={maxWidth}
      className={clsx(classes.gridPaginatorRoot, props.classNameRoot)}
      withRecommendations={false}
    >
    {
      productsGroupedInGrids &&
      <BindKeyboardSwipeableViews
        enableMouseEvents={false}
        index={props.index}
        containerStyle={{ height: '100%' }}
        style={{
          height: '100%',
          ...props.containerStyle,
        }}
        springConfig={disableAnimation ? noAnim : someAnim}
      >
        {
          productGroups.map(( productGroup, index) => {
            // console.log("productGroups:", productGroup)
            return (
              <div key={`product-group-${index}`}
                className={clsx(
                  props.loading ? "fadeIn" : "staggerFadeIn",
                  props.className ? props.className : classes.flexRow,
                )}
              >
                {
                  productGroup
                  .filter(p => !!p)
                  .map(( product, j ) =>
                    props.loading
                    ? props.loadingComponent
                      ? props.loadingComponent
                      : <LoadingCards key={j} count={1}/>
                    : <div key={j} className={props.gridItemClassName}>
                        {
                          props.children({
                            key: j,
                            node: product,
                          })
                        }
                      </div>
                  )
                }
              </div>
            )
          })
        }
      </BindKeyboardSwipeableViews>
    }
    </AlignCenterLayout>
  );
}





interface ReactProps<T> {
  connection: GenericConnection<T>;
  index: number;
  totalCount: number;
  setTotalCount?: React.Dispatch<React.SetStateAction<number>>;
  numItemsPerPage?: number;
  overfetchBy?: number;
  disableAnimation?: boolean;
  classNameRoot?: any;
  className?: any;
  gridItemClassName?: any;
  maxWidth?: number;
  // product rows only, for seller dashboard
  refetchProducts?(): void;
  loading?: boolean;
  loadingComponent?: React.ReactElement;
  containerStyle?: any;
}
interface ReactChildren<T> {
  // GridPaginator will split node[] into node[][]
  // and pass node back to style child components in a higher-order function
  // {({ node }) => <div>{node.id}</div>}
  children?(params: {
    key: any,
    node: T
  }): React.ReactNode
}

export const useStyles = makeStyles({
  gridPaginatorRoot: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: '1rem',
    // minHeight: 520, // 2x 260px tall product cards
    minHeight: 200, // 2x 260px tall product cards
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  marginRight1: {
    marginRight: '1rem',
  },
  gridItem: {
    width: '100%',
    height: '100%',
  },
});


export default GridPaginatorGeneric;


