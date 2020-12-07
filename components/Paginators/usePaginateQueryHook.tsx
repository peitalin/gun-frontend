
import * as React from "react";
import {oc as option} from "ts-optchain";
// GraphQL
import { useQuery } from "@apollo/client";
import { WatchQueryFetchPolicy } from "@apollo/client";
import { DocumentNode } from "graphql";
// typings
import { Connection, PageCursor } from "typings/gqlTypes";



const usePaginateQuery = <QueryData, QueryVar, NodeType>(
  props: usePaginateQueryProps<QueryData, NodeType>
) => {

  const [connectionQuery, setConnectionQuery] = React.useState({
    sortAscending: props.sortAscending,
    pageBackwards: false,
    count: props.count ? props.count : 3,
    page: {
      backwardsCursor: null,
      forwardsCursor: null,
      hasNextPage: false,
      hasPreviousPage: false
    },
    cursor: undefined, // must be undefined, not null, for caching
    // caching cursor === undefined queries
  } as ConnectionQueryProps);

  const getPrevPage = () => {
    if (connectionQuery.page.hasPreviousPage) {
      setConnectionQuery(s => {
        return {
          ...s,
          pageBackwards: true,
          cursor: s.page.backwardsCursor,
        }
      })
    }
  }

  const getNextPage = () => {
    if (connectionQuery.page.hasNextPage) {
      setConnectionQuery(s => ({
        ...s,
        pageBackwards: false,
        cursor: s.page.forwardsCursor,
      }))
    }
  }

  const getPageAtCursor = (cursor: string) => {
    setConnectionQuery(s => ({
      ...s,
      pageBackwards: false,
      sortAscending: false,
      cursor: cursor,
    }))
  }

  // console.log("sortAscending: ", props.sortAscending)

  const apolloIsShitResults = useQuery<QueryData, QueryVar>(props.query, {
    variables: {
      ...props.variables,
      // THIS MUST BE NAMED query, not connectionQuery
      query: {
        count: connectionQuery.count,
        cursor: connectionQuery.cursor,
        pageBackwards: connectionQuery.pageBackwards,
        sortAscending: connectionQuery.sortAscending,
        // sortAscending: props.sortAscending,
        // sortAscending: false,
      },
    },
    fetchPolicy: props.fetchPolicy || 'cache-first', // use cache if possible.
    // prevents hard-refresh when cursor === undefined (first page)
    ssr: props.ssr || false,
  });

  const {
    loading,
    error,
    data,
  } =  apolloIsShitResults;

  let refetch;

  if (apolloIsShitResults) {
    refetch = apolloIsShitResults.refetch
  } else {
    refetch = () => console.log("not defined, apollo are retards")
  }


  const [connection, connectionName] = props.connectionSelector(data);

  // This effect resets new forwards and backwards cursors
  // after a new Graphql query everytime a new query is fetched
  React.useEffect(() => {
    if (option(connection).edges()) {
      if (connection.edges.length === 0) {
        const page = {
          backwardsCursor: null,
          forwardsCursor: null,
          hasNextPage: false,
          hasPreviousPage: false
        };
        setConnectionQuery(s => ({
          ...s,
          page: page
        }))
      } else {

        const forwardsCursor = connection.edges[connection.edges.length - 1].cursor || null;
        const backwardsCursor = connection.edges[0].cursor || null;
        const page = {
          backwardsCursor,
          forwardsCursor,
          hasNextPage: !connectionQuery.pageBackwards
            ? !option(connection).pageInfo.isLastPage()
            : true,
          hasPreviousPage: connectionQuery.pageBackwards
            ? !option(connection).pageInfo.isLastPage()
            : connectionQuery.cursor != null
        };
        setConnectionQuery(s => ({
          ...s,
          page: page
        }))
      }
    }
  }, [
    loading,
    option(connection).pageInfo(),
    props.count,
  ])


  // https://github.com/apollographql/react-apollo/issues/3862

  return {
    getPrevPage,
    getNextPage,
    getPageAtCursor,
    connectionQuery,
    loading,
    error,
    data,
    refetch,
  }

}


interface usePaginateQueryProps<QueryData, NodeType> {
  query: DocumentNode;
  variables: any;
  connectionSelector(data: QueryData): [
    // GenericCursorBasedConnection<NodeType> | GenericPageBasedConnection<NodeType>,
    any,
    string
  ];
  // a function that selects the Connection<T> from the data,
  // The function can return 2 second argument: connectionName,
  // for queries where the Connection is nested (not in top level of response)
  count?: number;
  sortAscending: boolean;
  // apollo useQuery props
  ssr?: boolean;
  fetchPolicy?: WatchQueryFetchPolicy;
}

export interface ConnectionPage {
  backwardsCursor: string;
  forwardsCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ConnectionQueryProps {
  sortAscending?: boolean;
  cursor: PageCursor;
  pageBackwards: boolean;
  count: number;
  // non-gql provided props
  page?: ConnectionPage;
}


export default usePaginateQuery;