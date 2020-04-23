
import React from "react";
import {oc as option} from "ts-optchain";
// Utils Components
import ErrorDisplay from "components/Error";
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
import Button from "@material-ui/core/Button";
// Typings
import { Connection } from "typings/gqlTypes";
import { WatchQueryFetchPolicy } from "apollo-client";
// Paginator hooks
import usePaginateQueryHook from "components/Paginators/usePaginateQueryHook";
import { GenericConnection } from "typings";



// React.FC<ReactProps> typings not working on VSCode
const PaginateButtonsWithQuery = <QueryData, QueryVar, NodeType>(
  props: PaginateButtonsWithQueryProps<QueryData, NodeType>
) => {

  const {
    loading,
    error,
    data,
    refetch,
    getNextPage,
    getPrevPage,
    getPageAtCursor,
    connectionQuery,
  } = usePaginateQueryHook<QueryData, QueryVar, NodeType>({
    query: props.query,
    sortAscending: props.sortAscending,
    variables: props.variables,
    connectionSelector: props.connectionSelector,
    count: props.count || 3,
    ssr: props.ssr,
    fetchPolicy: props.fetchPolicy
  });
  // refetch not being passed down from usePaginateQueryHook.
  // refetch is undefined when usePaginateQueryHook is first initialized

  if (
    !connectionQuery.page.hasPreviousPage &&
    !connectionQuery.page.hasNextPage
  ) {
    return (
      <div>
        { props.children({ data, loading, error, refetch }) }
      </div>
    )
  }

  return (
    <PaginateButtons
      loading={loading}
      error={error}
      data={data}
      refetch={refetch}
      getNextPage={getNextPage}
      getPrevPage={getPrevPage}
      getPageAtCursor={getPageAtCursor}
      connectionQuery={connectionQuery}
    >
      { props.children({ data, loading, error, refetch }) }
    </PaginateButtons>
  )
}


interface PaginateButtonsProps {
  loading: boolean;
  error: any;
  data: any;
  refetch: any;
  getNextPage(): void;
  getPrevPage(): void;
  getPageAtCursor(cursor: string): void;
  connectionQuery: any;
}

export const PaginateButtons: React.FC<PaginateButtonsProps> = (props) => {

  const {
    data,
    loading = false,
    error,
    refetch,
    getPrevPage,
    getNextPage,
    getPageAtCursor,
    connectionQuery,
  } = props;


  const [cursors, setCursors] = React.useState([
    { page: 1, cursor: undefined } // undefined => starting cursor
  ]);

  const cursorsHead = (cursors.length > 6)
    ? cursors.slice(0, 3)
    : cursors

  return (
    <main className={"paginate-buttons-root"} style={{ width: '100%' }}>
      {props.children}
      <div style={{
        flexGrow: 1,
      }}/>
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Button
          disabled={!connectionQuery.page.hasPreviousPage}
          variant="text"
          onClick={() => {
            getPrevPage()
          }}
        >
          Previous
        </Button>
        {
          cursorsHead.map(cursor => {
            return (
              <Button
                key={cursor.page}
                disabled={false}
                variant="text"
                onClick={() => {
                  getPageAtCursor(cursor.cursor)
                }}
                style={{ minWidth: '2rem' }}
              >
                {cursor.page}
              </Button>
            )
          })
        }
        {
          (cursors.length > 6) &&
          <div>...</div>
        }
        {
          (cursors.length > 6) &&
          cursors.slice(-3).map(cursor => {
            return (
              <Button
                key={cursor.page}
                disabled={false}
                variant="text"
                onClick={() => {
                  setCursors(s => s.slice(0, cursor.page + 1))
                  getPageAtCursor(cursor.cursor)
                }}
                style={{ minWidth: '2rem' }}
              >
                {cursor.page}
              </Button>
            )
          })
        }
        <Button
          disabled={!connectionQuery.page.hasNextPage}
          variant="text"
          onClick={() => {
            // add cursor if its not already in cursors list.
            if (!cursors.find(c => c.cursor === connectionQuery.page.forwardsCursor)) {
              setCursors(s => [
                ...s,
                { page: s.length + 1, cursor: connectionQuery.page.forwardsCursor }
              ])
            }
            getNextPage()
          }}
        >
          Next
        </Button>
      </div>
      {/* {
        loading &&
        <Loading fixed loading={loading} delay={"100ms"}/>
      } */}
    </main>
  )
}


interface PaginateButtonsWithQueryProps<QueryData, NodeType> {
  query: string;
  variables: any;
  sortAscending: boolean;
  connectionSelector(data: QueryData): [GenericConnection<NodeType>, string];
  className?: string;
  count?: number;
  id?: string;
  bottomOffSet?: number; // distance (px) from bottom of page to trigger nextPage()
  children?(args: any): React.ReactNode;
  // apollo useQuery props
  ssr?: boolean;
  fetchPolicy?: WatchQueryFetchPolicy;
}

export default PaginateButtonsWithQuery;