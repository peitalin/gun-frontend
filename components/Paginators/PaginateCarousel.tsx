
import * as React from "react";
import {oc as option} from "ts-optchain";
// Utils Components
import ErrorDisplay from "components/Error";
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
import Button from "@material-ui/core/Button";
// Typings
// import { Connection, ID } from "typings/gqlTypes";
type Connection = any;
type ID = any;
import { GenericConnection } from "typings";

import { WatchQueryFetchPolicy } from "apollo-client";
// Paginator hooks
import usePaginateQueryHook from "components/Paginators/usePaginateQueryHook";
import AirCarousel from "components/AirCarousel";
import { useScrollXPosition } from "utils/hooks";
import { Typography } from "@material-ui/core";



const PaginateCarousel = <QueryData, QueryVar, NodeType extends { id: ID }>(
  props: PaginateCarouselProps<QueryData, NodeType>
) => {

  const initialConnectionState: GenericConnection<NodeType> = {
    edges: [],
    pageInfo: { endCursor: null, isLastPage: false },
    totalCount: 0,
  };

  // accumulate connection results as you scroll down.
  const [accumConnection, setAccumConnection] = React.useState(initialConnectionState);
  const [el, setEl] = React.useState<HTMLElement>(null);

  const {
    loading,
    error,
    data,
    refetch,
    getNextPage,
    getPrevPage,
    connectionQuery,
  } = usePaginateQueryHook<QueryData, QueryVar, NodeType>({
    query: props.query,
    variables: props.variables,
    connectionSelector: props.connectionSelector,
    count: props.count + 1 || 3,
    ssr: props.ssr,
    fetchPolicy: props.fetchPolicy
  });

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

  React.useEffect(() => {
    if (process.browser) {
      let el: HTMLElement = document.querySelector(`#${props.id}`);
      if (el) {
        setEl(el)
      }
    }
  }, [])

  const {
    scrollLeft,
    scrollWidth,
    clientWidth
  } = useScrollXPosition(
    process.browser
      ? document.querySelector(`#${props.id}`)
      : el,
    props.id
  );

  const maxScrollLeft = scrollWidth - clientWidth;
  const isLeftEnd = scrollLeft > (maxScrollLeft - 10) // 10px offset
  // when you get within 10px of the edge, trigger isLeftEnd

  React.useEffect(() => {
    if (isLeftEnd) {
      getNextPage()
    }
  }, [isLeftEnd])


  return (
    <>
      <AirCarousel
        id={props.id}
        handleClickLeft={getPrevPage}
        handleClickRight={getNextPage}
        disableButtons={true}
        scrollSnapType={"none"}
      >
        {
          props.children({
            loading,
            error,
            refetch,
            data: {
              [connectionName]: {
                ...accumConnection
              }
            },
          })
        }
      </AirCarousel>
      {
        option(connection).pageInfo.isLastPage() &&
        <div style={{
          marginTop: '0.5rem',
          display: 'flex',
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}>
          <Typography variant="subtitle2">
            End. No more results.
          </Typography>
        </div>
      }
      {
        loading &&
        <Loading fixed loading={loading} delay={"100ms"}/>
      }
    </>
  )
}


interface PaginateCarouselProps<QueryData, NodeType> {
  query: string;
  variables: any;
  count?: number;
  id: string;
  connectionSelector(data: QueryData): [GenericConnection<NodeType>, string];
  children?(args: any): React.ReactNode;
  className?: string;
  // apollo useQuery props
  ssr?: boolean;
  fetchPolicy?: WatchQueryFetchPolicy;
}

export default PaginateCarousel;