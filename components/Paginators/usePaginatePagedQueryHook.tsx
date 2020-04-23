
import React from "react";
import {oc as option} from "ts-optchain";
// GraphQL
import { useQuery } from "@apollo/react-hooks";
// typings
import { PageBasedConnection, ConnectionQuery, PageCursor } from "typings/gqlTypes";
import { GenericPageBasedConnection, GenericConnection } from "typings";
import { WatchQueryFetchPolicy } from "apollo-client";



const usePaginatePagedQuery = () =>
<QueryData, QueryVar, NodeType>(props: usePaginateQueryProps<QueryData, NodeType>) => {

  const [connectionQuery, setConnectionQuery] = React.useState({
    sortAscending: props.sortAscending,
    pageBackwards: false,
    count: props.count ? props.count : 3,
    page: {
      pageNumber: 1,
      totalPages: 0,
      isLastPage: false,
    },
  } as ConnectionQueryProps);


  const getPage = (pageNumber: number) => {
    setConnectionQuery(s => ({
      ...s,
      pageBackwards: false,
      page: {
        ...connectionQuery.page,
        pageNumber: pageNumber
      }
    }))
  }

  const { loading, error, data, refetch } = useQuery<QueryData, QueryVar>(
    props.query as any, {
    variables: {
      ...props.variables,
      // THIS MUST BE NAMED query, not connectionQuery
      query: {
        count: connectionQuery.count,
        pageNumber: connectionQuery.page.pageNumber,
        sortAscending: connectionQuery.sortAscending,
      },
    },
    fetchPolicy: 'network-only', // don't use cache
  });

  const [connection, connectionName] = props.connectionSelector(data);

  // This effect resets new forwards and backwards cursors
  // after a new Graphql query everytime a new query is fetched
  React.useEffect(() => {
    if (option(connection).edges()) {
      if (connection.edges.length === 0) {
        const page = {
          pageNumber: 1,
          totalPages: 0,
          isLastPage: true,
        };
        setConnectionQuery(s => ({ ...s, page: page }))
      } else {
        const page = {
          pageNumber: connectionQuery.page.pageNumber,
          totalPages: connectionQuery.page.totalPages,
          isLastPage: connectionQuery.page.isLastPage,
        };
        setConnectionQuery(s => ({ ...s, page: page }))
      }
    }
    console.log("updating pages...")
  }, [
    loading,
    option(connection).pageInfo(),
    props.count,
  ])


  return {
    getPage,
    connectionQuery,
    loading,
    error,
    data,
    refetch,
  }
}


export interface usePaginateQueryProps<QueryData, NodeType> {
  query: string;
  variables: any;
  connectionSelector(data: QueryData): [
    // GenericConnection<NodeType> | GenericPageBasedConnection<NodeType>,
    any,
    string
  ];
  // a function that selects the Connection<T> from the data,
  // The function can return 2 second argument: connectionName,
  // for queries where the Connection is nested (not in top level of response)
  count?: number;
  ssr?: boolean;
  fetchPolicy?: WatchQueryFetchPolicy;
  sortAscending?: boolean;
  refetchQueries?(result?: any): void;
  awaitRefetchQueries?: boolean;
}

export interface ConnectionPage {
  pageNumber: number;
  totalPages: number;
  isLastPage: boolean;
}

export interface ConnectionQueryProps {
  sortAscending?: boolean;
  cursor: PageCursor;
  pageBackwards: boolean;
  count: number;
  // non-gql provided props
  page?: ConnectionPage;
}


export default usePaginatePagedQuery;