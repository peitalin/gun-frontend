
import React from 'react';
import { oc as option } from "ts-optchain";
// Styles
import { Colors, BoxShadows } from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// graphql
import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import { useApolloClient } from "@apollo/react-hooks";
// typings
import { Chat, Chat_Messages } from "typings/gqlTypes";
// components
import Typography from '@material-ui/core/Typography';
import ChatLayout from './ChatLayout';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { GrandReduxState, Actions } from 'reduxStore/grand-reducer';
import { UserPrivate } from "typings/gqlTypes";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Material UI
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";




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

  const {
    classes,
    asModal = false,
  } = props

  const [state, setState] = React.useState({
    refetch: null,
  })

  const apolloClient = useApolloClient()
  const user = useSelector<GrandReduxState, UserPrivate>(
    state => state.reduxLogin.user
  );
  const userId = option(user).id()


  const setRefetch = (refetch: () => {}) => {
    setState(s => ({ ...s, refetch: refetch }))
  }

  const dispatch = useDispatch();

  const chatCenterOpen = useSelector<GrandReduxState, boolean>(
    state => state.reduxModals.chatCenterOpen
  );

  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));


  const closeModal = () => {
    dispatch(Actions.reduxModals.TOGGLE_CHAT_CENTER_MODAL(false))
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


  if (!asModal) {
    return (
      <div className={classes.root}>
        <div className={clsx(classes.chatContainer, classes.flexRow)}>
          {
            userId &&
            <ChatLayout
              user={user}
              refetch={state.refetch}
              setRefetch={setRefetch}
            />
          }
        </div>
      </div>
    )
  } else {
    return (
      <>
        <Dialog
          open={chatCenterOpen}
          onClose={closeModal}
          fullScreen={false}
          fullWidth={true}
          // fullWidth={false}
          maxWidth="xl"
          BackdropProps={{
            classes: {
              root: classes.modalBackdrop,
            }
          }}
          PaperProps={{
            classes: {
              root: smDown
                ? classes.fullMaxHeight
                : classes.modalPaperScrollPaper
            }
          }}
          scroll={"body"}
        >
          <div className={classes.root}>
            <div className={clsx(classes.chatContainer, classes.flexRow)}>
              {
                userId &&
                <ChatLayout
                  user={user}
                  refetch={state.refetch}
                  setRefetch={setRefetch}
                />
              }
            </div>
          </div>
        </Dialog>
      </>
    )
  }
};

interface ReactProps extends WithStyles<typeof styles> {
  asModal?: boolean
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
  },
  chatContainer: {
    overflow: "hidden",
    boxShadow: BoxShadows.shadow1.boxShadow,
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
  // modal classes
  modalBackdrop: {
    backgroundColor: "rgba(47, 57, 65, .85)",
  },
  modalPaperScrollPaper: {
    // maxHeight: "calc(100% - 32px)",
  },
  fullMaxHeight: {
    maxHeight: "100%",
    width: '100%',
  },
});


export default withStyles(styles)( ChatMain );
