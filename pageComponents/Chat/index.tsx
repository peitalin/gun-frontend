
import React from 'react';
import { oc as option } from "ts-optchain";
// Styles
import { Colors } from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// graphql
import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import { useApolloClient } from "@apollo/react-hooks";
// typings
import { Chat, Chat_Messages } from "typings/gqlTypes";
// components
import { Typography } from '@material-ui/core';
import ChatLayout from './ChatLayout';
// Redux
import { useSelector } from 'react-redux';
import { GrandReduxState } from 'reduxStore/grand-reducer';
import { UserPrivate } from "typings/gqlTypes";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";



const SUBSCRIBE_TO_NEW_MESSAGES = gql`
subscription MessageAdded {
  chatMessages: chat_messages(
    order_by: { id: desc },
    limit: 10
  ) {
    id
    chatId
    sender {
      id
      firstName
      lastName
    }
    content
    previewItem {
      id
    }
  }
}
`;

const EMIT_ONLINE_EVENT = gql`
  mutation ($senderId:String!){
    update_users (
      _set: { lastSeen: "now()" }
      where: { id: { _eq: $senderId } }
    ) {
      affected_rows
      returning {
        id
      }
    }
  }
`;


const ChatMain: React.FC<ReactProps> = (props) => {

  const [state, setState] = React.useState({
    userName: undefined,
    refetch: null,
  })

  const apolloClient = useApolloClient()
  const user = useSelector<GrandReduxState, UserPrivate>(
    state => state.reduxLogin.user
  );
  const userId = option(user).id()
  const userName = option(user).firstName("") + " " + option(user).lastName("");

  const { classes } = props;

  const setRefetch = (refetch: () => {}) => {
    setState(s => ({ ...s, refetch: refetch }))
  }

  React.useEffect(() => {
    // Emit and event saying the user is online every 3 seconds
    let onlineEventIntervalId = setInterval(async () => {
      if (userId) {
        await apolloClient.mutate({
          mutation: EMIT_ONLINE_EVENT,
          variables: {
            senderId: userId
          }
        });
      }
    }, 3000);

    // clear interval when component unmounts
    () => clearInterval(onlineEventIntervalId)
  }, [])


  const { data, loading } = useSubscription<QueryData, QueryVar>(
    SUBSCRIBE_TO_NEW_MESSAGES, {
      variables: {
      }
    }
  );

  return (
    <div className={classes.root}>
      <div className={clsx(classes.chatContainer, classes.flexRow)}>
        {
          loading && "loading..."
        }
        <ChatLayout
          userId={userId}
          refetch={state.refetch}
          setRefetch={setRefetch}
        />
      </div>
    </div>
  )
};

interface ReactProps extends WithStyles<typeof styles> {
}
interface QueryData {
  chatMessages: Chat_Messages;
}
interface QueryVar {
  // query: ConnectionOffsetQuery
}


const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    padding: '2rem',
  },
  chatContainer: {
    borderRadius: '6px',
    // border: `1px solid ${Colors.darkerGrey}`,
    overflow: "hidden",
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productColumn60: {
    flexBasis: '60%',
    flexGrow: 1,
    minWidth: 360,
  },
  productColumn40: {
    flexBasis: '40%',
    flexGrow: 1,
    minWidth: 280,
  },
  maxWidth: {
    maxWidth: '1160px', // 4 products per row
  },
});


export default withStyles(styles)( ChatMain );
