
import * as React from "react";
import {oc as option} from "ts-optchain";
// Utils Components
import ErrorDisplay from "components/Error";
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
import Button from "@material-ui/core/Button";
// Typings
import { Connection, ID } from "typings/gqlTypes";
import { GenericConnection } from "typings";
import { WatchQueryFetchPolicy } from "@apollo/client";
// Paginator hooks
import usePaginateQueryHook from "components/Paginators/usePaginateQueryHook";
import { useScrollYPosition } from "utils/hooks";
import { DocumentNode } from "graphql";
// throttle
const throttle = require('lodash.throttle');



// React.FC<ReactProps> typings not working on VSCode
const PaginateOnScroll = <QueryData, QueryVar, NodeType extends { id: ID }>(
  props: PaginateScrollProps<QueryData, NodeType>
) => {

  const initialConnectionState: GenericConnection<NodeType> = {
    edges: [],
    pageInfo: { endCursor: null, isLastPage: false },
    totalCount: 0,
  };

  // accumulate connection results as you scroll down.
  const [accumConnection, setAccumConnection] = React.useState(initialConnectionState);

  const {
    loading,
    error,
    data,
    getNextPage,
    getPrevPage,
    connectionQuery,
  } = usePaginateQueryHook<QueryData, QueryVar, NodeType>({
    query: props.query,
    variables: props.variables,
    connectionSelector: props.connectionSelector,
    count: props.count || 3,
    ssr: props.ssr,
    fetchPolicy: props.fetchPolicy
  });

  // const connection: Connection<keyof QueryData> = option(data)[props.connectionName]();
  const [connection, connectionName] = props.connectionSelector(data);

  React.useEffect(() => {
    if (option(connection).edges()) {
      setAccumConnection(s => {
        return {
          ...connection,
          edges: [
            ...s.edges,
            ...connection.edges
              .filter(e => !s.edges.find(s => s.node.id === e.node.id))
          ]
        }
      })
    }
  }, [option(connection).edges()])



  let yPos = useScrollYPosition();

  let isBottom;
  if (process.browser) {
    isBottom = yPos > (document.body.clientHeight
                  - window.innerHeight
                  - (props.bottomOffSet || 200));
  } else {
    isBottom = false;
  }


  React.useEffect(() => {
    if (isBottom) {
      getNextPage()
    }
  }, [isBottom])

  return (
    <>
    {
      props.children({
        loading,
        error,
        data: {
          [connectionName]: {
            ...accumConnection
          }
        },
      })
    }
    </>
  )
}


interface PaginateScrollProps<QueryData, NodeType> {
  query: DocumentNode;
  variables: any;
  connectionSelector(data: QueryData): [GenericConnection<NodeType>, string];
  count?: number;
  id?: string;
  bottomOffSet?: number; // distance (px) from bottom of page to trigger nextPage()
  children?(args: any): React.ReactNode;
  // apollo useQuery props
  ssr?: boolean;
  fetchPolicy?: WatchQueryFetchPolicy;
}

export default PaginateOnScroll;