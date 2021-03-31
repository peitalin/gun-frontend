import React from 'react';
// components
import dynamic from "next/dynamic";
// import CurrentConversation from './CurrentConversation';
import CurrentConversationLoading from './CurrentConversation/CurrentConversationLoading';
const CurrentConversation = dynamic(() => import("./CurrentConversation"), {
  loading: () => <CurrentConversationLoading/>,
  ssr: false,
})

import Textbox from './Textbox'
import ConversationsListPanel from './ConversationsListPanel';
import ProductPanel from './ProductPanel';
// typings
import { UserPrivate, Conversation } from "typings/gqlTypes";
// Styles
import { Colors, BoxShadows, BorderRadius2x, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ScrollDownButton from "./ScrollDownButton";
// graphql
import { useSubscription } from '@apollo/client';
import gql from 'graphql-tag'
import { SUBSCRIBE_USER_CONVERSATIONS } from "queries/chat-subscriptions";
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
    SUBSCRIBE_USER_CONVERSATIONS, {
      variables: {
        messageLimit: 5
      }
    }
  );

  const currentConversation = (data?.myConversations ?? [])
    .find(c => c?.chatRoom?.id === currentConversationId)

  const chatDivId = currentConversationId
  const userId = user?.id

  React.useEffect(() => {
    // set initial conversation on mount + data response
    if ((data?.myConversations ?? []).length > 0) {
      if (!currentConversationId) {
        console.log("resetting current chatRoom id")
        let currentConvo = (data?.myConversations ?? [])
          .find(c => c.chatRoom.status === "ACTIVE")
        let currentConvoId = currentConvo?.chatRoom?.id
        setCurrentConversationId(currentConvoId)
      } else {
        setCurrentConversationId(currentConversationId)
      }
      dispatch(Actions.reduxConversation.SET_CONVERSATIONS(data.myConversations))
    }
  }, [data, loading])

  // console.log("currentConversationId: ", currentConversationId)
  console.log("subsription data: ", data)
  console.log("currentConversation: ", currentConversation)

  return (
    <div className={classes.chatLayout}>
      <div className={clsx(classes.col25, classes.wd25)}>
        <ConversationsListPanel
          userId={userId}
          chatDivId={chatDivId}
          conversations={data?.myConversations}
          setCurrentConversationId={setCurrentConversationId}
        />
      </div>
      <div className={clsx(classes.col75, classes.wd75)}>
        {
          loading
          ? <CurrentConversationLoading/>
          : <CurrentConversation
              chatDivId={chatDivId}
              currentConversation={currentConversation}
              refetch={refetch}
              setRefetch={setRefetch}
              setMutationCallback={setMutationCallback}
              isBottom={isBottom}
              setIsBottom={setIsBottom}
              userId={userId}
            />
        }
        <ScrollDownButton
          chatDivId={chatDivId}
          isBottom={isBottom}
        />
        <Textbox
          mutationCallback={mutationCallback}
          userId={userId}
          chatRoomId={chatDivId}
          product={currentConversation?.chatRoom?.product}
        />
      </div>
      <div className={clsx(classes.col25, classes.wd25, classes.productPanelFixed)}>
        <ProductPanel
          currentConversation={currentConversation}
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
  myConversations: Conversation[]
}
interface QueryVar {
  // query: ConnectionQuery
  messageLimit: number
}

const styles = (theme: Theme) => createStyles({
  col25: {
    borderRadius: BorderRadius2x,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.darkWhite,
    border: theme.palette.type === 'dark'
      ? `unset`
      : `1px solid ${Colors.slateGreyDarker}`,
    boxShadow: theme.palette.type === 'dark'
      ? BoxShadows.shadow1.boxShadow
      : 'unset',
  },
  wd25: {
    width: '25%',
    minWidth: 280,
    marginRight: '0.5rem',
  },
  col75: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  wd75: {
    width: '75%',
    minWidth: 360,
    marginRight: '0.5rem',
  },
  chatLayout: {
    display: 'flex',
    width: '100%',
    borderRadius: BorderRadius,
  },
  onlineUsersContainer: {
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.darkWhite,
  },
  mobileview: {
    position: "absolute",
    right: "0px",
    bottom: "152px",
    width: "50%",
  },
  productPanelFixed: {
    position: 'fixed',
    border: theme.palette.type === 'dark'
      ? `unset`
      : `1px solid ${Colors.slateGreyDarker}`,
    boxShadow: theme.palette.type === 'dark'
      ? BoxShadows.shadow1.boxShadow
      : 'unset',
    bottom: '-33%',
    left: '1rem',
    transition: theme.transitions.create('bottom', {
      easing: theme.transitions.easing.sharp,
      duration: "150ms",
    }),
    "&:hover": {
      bottom: '1rem',
      transition: theme.transitions.create('bottom', {
        easing: theme.transitions.easing.sharp,
        duration: "150ms",
      }),
    },
  }
})


export default withStyles(styles)( ChatLayout );