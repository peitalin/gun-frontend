import React from 'react';
import { oc as option } from "ts-optchain";
// components
import CurrentConversation from './CurrentConversation';
import Textbox from './Textbox'
import ConversationsList from './ConversationsList';
import { UserPrivate } from "typings/gqlTypes";
// Styles
import { Colors, BoxShadows } from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// typings
import { Chat, Chat_Messages, Users, Chat_Users } from "typings/gqlTypes";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ScrollDownButton from "./ScrollDownButton";
// graphql
import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import { GET_USER_CONVERSATIONS } from "queries/chat-subscriptions";
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { GrandReduxState, Actions } from 'reduxStore/grand-reducer';





export const ChatLayout: React.FC<ReactProps> = (props) => {

  const [refetch, setRefetch] = React.useState(undefined)
  const [mutationCallback, setMutationCallback] = React.useState(undefined)
  const [isBottom, setIsBottom] = React.useState(false)
  // Set mutation callback. For instantly adding messages to state after mutation
  const {
    classes,
    user,
  } = props;

  const dispatch = useDispatch()
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  // if navigating from product page, and you want to open the chat modal
  // on a specific product chatroom
  const initialConversationId = useSelector<GrandReduxState, string>(s =>
    s.reduxConversation.currentConversationId
  )

  const [
    currentConversationId,
    setCurrentConversationId,
  ] = React.useState<string>(initialConversationId)

  const { data, loading, error } = useSubscription<QueryData, QueryVar>(
    GET_USER_CONVERSATIONS, {
      variables: {
        userId: option(user).id()
      }
    }
  );

  const currentConversation = option(data).conversations([])
    .find(c => option(c).chat.id() === currentConversationId)

  const chatDivId = currentConversationId
  const userId = option(user).id()
  const userName = option(user).firstName("") + " " + option(user).lastName("");

  React.useEffect(() => {
    // set initial conversation on mount + data response
    if (option(data).conversations([]).length > 0) {
      if (!currentConversationId || !initialConversationId) {
        setCurrentConversationId(option(data).conversations[0].chat.id())
      } else {
        setCurrentConversationId(currentConversationId)
      }
      dispatch(Actions.reduxConversation.SET_CONVERSATIONS(data.conversations))
    }
  }, [data, loading])

  console.log("currentConversationId: ", currentConversationId)
  console.log("currentConversation: ", currentConversation)

  return (
    <div className={classes.chatLayout}>
      <div className={clsx(classes.col25, classes.wd25)}>
        <ConversationsList
          userId={userId}
          userName={userName}
          chatDivId={chatDivId}
          conversations={option(data).conversations()}
          setCurrentConversationId={setCurrentConversationId}
        />
      </div>
      <div className={clsx(classes.col75, classes.wd75)}>
        <CurrentConversation
          chatDivId={chatDivId}
          currentConversation={currentConversation}
          refetch={refetch}
          setRefetch={setRefetch}
          setMutationCallback={setMutationCallback}
          isBottom={isBottom}
          setIsBottom={setIsBottom}
          userName={userName}
          userId={userId}
        />
        <ScrollDownButton
          chatDivId={chatDivId}
          isBottom={isBottom}
        />
        <Textbox
          userName={userName}
          mutationCallback={mutationCallback}
          userId={userId}
          chatId={chatDivId}
        />
      </div>
    </div>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate;
  refetch?(a?: any): void;
  setRefetch?(a?: any): void;
}

interface QueryData {
  conversations: Chat_Users[]
}
interface QueryVar {
  // query: ConnectionOffsetQuery
}

const styles = (theme: Theme) => createStyles({
  col25: {
    backgroundColor: Colors.lightGrey,
    borderRight: `4px solid ${Colors.white}`,
  },
  wd25: {
    width: '25%',
  },
  col75: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  wd75: {
    width: '75%',
  },
  chatLayout: {
    display: 'flex',
    width: '100%',
    background: Colors.lightestGrey,
    border: `4px solid ${Colors.white}`,
    borderRadius: '1px',
  },
  onlineUsersContainer: {
    background: Colors.grey,
  },
  mobileview: {
    position: "absolute",
    right: "0px",
    bottom: "152px",
    width: "50%",
  },
})


export default withStyles(styles)( ChatLayout );