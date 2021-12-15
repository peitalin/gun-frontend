import React from "react";
import clsx from "clsx";
// Styles
import { Colors } from "layout/AppTheme";
import {
  withStyles,
  WithStyles,
  createStyles,
  makeStyles,
  Theme
} from "@material-ui/core/styles";
// Swipeable
import SwipeableViews from "components/Swiper/SwipeableViews";
import { virtualize, bindKeyboard } from 'react-swipeable-views-utils';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);
// const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));
import AlignCenterLayout from "components/AlignCenterLayout";
import LoadingCards from "pageComponents/FrontPage/LoadingCards";
// helpers
import { noAnim, someAnim } from "./GridPaginatorHelpers";
import {
  useEffectUpdateGridAccum,
} from "utils/hooksFacetSearch";
import { GenericConnection } from "typings";



function GridPaginatorGeneric<T>(
  props: ReactProps<T> & ReactChildren<T>
) {

  // need to add styles typings because I don't know how to do
  // typings with generics and withStyles(...) together
  let propsWithStyles = (props as GridPaginatorPropsStyled<T>)

  const {
    index,
    connection,
    totalCount,
    setTotalCount,
    numItemsPerPage,
    loading,
    overfetchBy = 1,
    maxWidth = 1160,
    disableAnimation = false,
    disableFadeIn = false,
  } = propsWithStyles

  const { classes } = propsWithStyles
  // const theme = useTheme();
  const [ hashmap, setHashmap ] = React.useState({})

  // accumulate incoming objects in a hashamp to lookup with the gridPaginator
  React.useEffect(() => {
    let newHashmap = {}
    connection?.edges?.forEach(({ node }: { node: any }) => {
      newHashmap[node?.id] = node
    })
    setHashmap(s => ({ ...hashmap, ...newHashmap }))

  }, [connection])


  let objectIdsGroupedInGrids = useEffectUpdateGridAccum({
    index,
    connection,
    totalCount,
    setTotalCount,
    numItemsPerPage,
    overfetchBy,
    loading,
  })

  let objectIdGroups: string[][] = Object.values(objectIdsGroupedInGrids)

  // console.log("hashmap", hashmap)
  // console.log("connection.edges", connection?.edges)
  // console.log("objectIdsGroupsInGrids", objectIdGroups)

  return (
    <AlignCenterLayout
      maxWidth={maxWidth}
      className={clsx(classes.gridPaginatorRoot, props.classNameRoot)}
      withRecommendations={false}
    >
    {
      objectIdsGroupedInGrids &&
      <BindKeyboardSwipeableViews
        enableMouseEvents={true}
        disabled={true} //disable touch swiping
        index={index}
        onSwitching={(i) => {
          console.log("SWITCHED : ", i)
        }}
        containerStyle={{ height: '100%' }}
        style={{
          height: '100%',
          ...props.containerStyle,
        }}
        springConfig={disableAnimation ? noAnim : someAnim}
      >
        {
          objectIdGroups.map(( objectIdGroup, subindex) => {
            return (
              <div key={`product-group-${subindex}`}
                className={clsx(
                  // props.loading ? "fadeIn" : "staggerFadeIn",
                  !disableFadeIn && "fadeInFast",
                  props.className ? props.className : classes.flexRow,
                )}
              >
                {
                  props.loading && (objectIdGroups[index]?.length === 0)
                  // if overfetching, only show loading if past the preloaded pages
                  ? [...Array(numItemsPerPage).keys()].map(j => {
                      return props.loadingComponent
                          ? <div key={j} className={props.loadingComponentClassName}>
                              {props.loadingComponent}
                            </div>
                          : <LoadingCards key={j} count={1}/>
                    })
                  : (objectIdGroups[index]?.length === 0)
                    ? <>{props.emptyComponent}</>
                    : objectIdGroup
                      .filter(objectId => !!hashmap[objectId])
                      .map(( objectId: string, j ) => {
                        // console.log("objectId: ", objectId)
                        // console.log("hashmap[objectId]: ", hashmap[objectId])
                        return (
                          <div key={j} className={props.gridItemClassName}>
                            {
                              props.children({
                                key: j,
                                node: hashmap[objectId],
                              })
                            }
                          </div>
                        )
                      })
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
  disableFadeIn?: boolean;
  classNameRoot?: any;
  className?: any;
  gridItemClassName?: any;
  maxWidth?: number;
  // product rows only, for seller dashboard
  refetchProducts?(): void;
  loading?: boolean;
  loadingComponent?: React.ReactElement;
  loadingComponentClassName?: any;
  containerStyle?: any;
  emptyComponent?: React.ReactNode
}

type GridPaginatorPropsStyled<T> = ReactProps<T> & WithStyles<typeof styles>

interface ReactChildren<T> {
  // GridPaginator will split node[] into node[][]
  // and pass node back to style child components in a higher-order function
  // {({ node }) => <div>{node.id}</div>}
  children?(params: {
    key: any,
    node: T
  }): React.ReactNode
}

// export const useStyles = makeStyles({
export const styles = (theme: Theme) => createStyles({
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



// export default React.memo(
//   (props) => <GridPaginatorGeneric {...props}/>
// ) as typeof GridPaginatorGeneric

const GridPaginatorGenericStyled = withStyles(styles)(GridPaginatorGeneric)

export default React.memo(
  (props) => <GridPaginatorGenericStyled {...props}/>
) as typeof GridPaginatorGeneric



