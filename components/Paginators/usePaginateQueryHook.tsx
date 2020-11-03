
import * as React from "react";
import {oc as option} from "ts-optchain";
// GraphQL
import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { WatchQueryFetchPolicy } from "@apollo/client";
// typings
import { Connection, ConnectionQuery, PageCursor } from "typings/gqlTypes";



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
      cursor: cursor,
    }))
  }

  const { loading, error, data, refetch } = useQuery<QueryData, QueryVar>(
    props.query as any, {
    variables: {
      ...props.variables,
      // THIS MUST BE NAMED query, not connectionQuery
      query: {
        count: connectionQuery.count,
        cursor: connectionQuery.cursor,
        pageBackwards: connectionQuery.pageBackwards,
        sortAscending: connectionQuery.sortAscending,
      },
    },
    fetchPolicy: props.fetchPolicy || 'network-only', // don't use cache
    ssr: props.ssr || false,
  });
  // console.log('error', error)
  // console.log('data', data)

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
        setConnectionQuery(s => ({ ...s, page: page }))
      } else {

        const forwardsCursor = connection.edges[connection.edges.length - 1].cursor || null;
        const backwardsCursor = connection.edges[0].cursor || null;
        const page = {
          backwardsCursor,
          forwardsCursor,
          hasNextPage: !connectionQuery.pageBackwards
            ? !connection.pageInfo.isLastPage
            : true,
          hasPreviousPage: connectionQuery.pageBackwards
            ? !connection.pageInfo.isLastPage
            : connectionQuery.cursor != null
        };
        setConnectionQuery(s => ({ ...s, page: page }))
      }
    }
  }, [
    loading,
    option(connection).pageInfo(),
    props.count,
  ])


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
    any,
    string
  ];
  // a function that selects the Connection<T> from the data,
  // The function can return 2 second argument: connectionName,
  // for queries where the Connection is nested (not in top level of response)
  count?: number;
  sortAscending?: boolean;
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