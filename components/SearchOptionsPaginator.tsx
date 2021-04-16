import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BorderRadius, BoxShadows } from "layout/AppTheme";
import clsx from "clsx";
// Material UI
import Pagination from '@material-ui/lab/Pagination';
// GraphQL Typings
import {
  Order_By,
} from "typings/gqlTypes";
import { useDebouncedCallback } from 'use-debounce';




const SearchOptionsPaginator: React.FC<ReactProps> = (props) => {

  // const isDarkMode = useSelector<GrandReduxState, boolean>(
  //   s => s.reduxLogin.darkMode === 'dark'
  // )

  const {
    classes,
    paginationParams,
    updateSetPageDelay = 256,
    hidePaginator = false,
  } = props;

  const {
    totalCount,
    overfetchBy,
    index,
    pageParam,
    setIndex,
    limit
  } = paginationParams;

  const totalPages = (totalCount * overfetchBy > 0)
    ? Math.ceil(totalCount * overfetchBy / limit)
    : 0;

  ///////////////////////////////////
  ///////////// State /////////////
  ///////////////////////////////////

  // for fast UI updates
  const [pageUi, setPageUi] = React.useState(1);
  // for actual gql dispatch for pagination page
  const [debounceSetPageParam, cancel, callPending] = useDebouncedCallback(
    (page: number) => {
      if (paginationParams?.setPageParam) {
        paginationParams.setPageParam(page)
      }
    },
    updateSetPageDelay
  ) // debounce by 540ms

  const [debounceSetIndex] = useDebouncedCallback((index: number) => {
      setIndex(index)
    },
    updateSetPageDelay
  ) // debounce by 540ms

  ///////////////////////////////////
  ///////////// Effects /////////////
  ///////////////////////////////////

  React.useEffect(() => {
    // usually, index is updated in response to pageUi changes
    // so that paginator number UI can switch without being blocked
    // but sometimes, when setting facets or filters (searchTerm)
    // pageUI needs to be synced to
    // index (as the number of pages can shrink to 1)
    setPageUi(index+1)
    if (paginationParams?.setPageParam) {
      paginationParams.setPageParam(index+1)
    }
  }, [index])

  React.useEffect(() => {
    // set page UI to pageParam (which may be url queyr params)
    // only do this on initial mount once
    setPageUi(pageParam)
  }, [])


  return (
    <div className={clsx(classes.paginationContainer, classes.marginRight05)}>
      {
        paginationParams &&
        !hidePaginator &&
        <div className={clsx(classes.marginRight05)}>
          <Pagination
            disabled={totalCount === 0}
            count={totalPages || 1}
            page={pageUi}
            // page={index+1}
            onMouseDown={(e) => {
              // console.log("mouse down: ", e)
            }}
            onChange={(event, page) => {
              // update paginator UI first
              setPageUi(page)
              // then update pageParams (gQL request) + index change in carousel
              debounceSetPageParam(page)
              debounceSetIndex(page - 1)
            }}
          />
        </div>
      }
    </div>
  )
}



/////////// Typings //////////////

interface ReactProps extends WithStyles<typeof styles> {
  paginationParams: {
    limit: number
    pageParam: number
    setPageParam?(a?: any): void;
    totalCount: number
    overfetchBy: number
    index: number
    setIndex(a?: any): void;
    onPrevPage?(a?: any): void;
    onNextPage?(a?: any): void;
  };
  hidePaginator?: boolean;
  updateSetPageDelay?: number;
}
export interface SelectOption {
  label: string;
  value: {
    createdAt?: Order_By
    price?: Order_By
  }
}

/////////// Styles //////////////

const styles = (theme: Theme) => createStyles({
  paginationContainer: {
    flexBasis: '100%',
    // marginRight: '1rem',
    // marginLeft: '1rem',
    display: 'flex',
    // justifyContent: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  marginRight05: {
    marginRight: '0.5rem',
  },
});



// Disrupt UI update, otherwise paginato count goes to 0 and back
// export default withStyles(styles)(SearchOptionsPaginator)

export default withStyles(styles)(React.memo(
  (props: ReactProps) => <SearchOptionsPaginator {...props}/>,
  (prevProps, nextProps) => {

    let stopRerender = false;
    let pTotalCount = prevProps?.paginationParams?.totalCount
    let nTotalCount = nextProps?.paginationParams?.totalCount

    if (pTotalCount > 0 && nTotalCount === undefined) {
      stopRerender = true
    }
    // console.log("PREV paginationParams: ", prevProps.paginationParams)
    // console.log("NEXT paginationParams: ", nextProps.paginationParams)

    // if true, don't re-render
    return stopRerender
  },
))