import React from 'react';
import { oc as option } from "ts-optchain";
// Styles
import { Colors, BoxShadows } from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// graphql
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/client';
import { useApolloClient } from "@apollo/client";
// typings
import { Chat_Rooms, Chat_Messages } from "typings/gqlTypes";
// components
import ButtonLoading from "components/ButtonLoading";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { v4 as uuidv4 } from "uuid"
// Snackbar
import { useSnackbar, ProviderContext } from "notistack";
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { GrandReduxState, Actions } from 'reduxStore/grand-reducer';
import { UserPrivate } from "typings/gqlTypes";



const CREATE_NEW_CHAT = gql`
  # create chat room between buyer and seller
  mutation createNewChat(
    $chatRoomId: String!
    $sellerUserId: String!
    $buyerUserId: String!
    $name: String
    $productId: String!
  ) {
    insert_chat_rooms(objects: [{
      id: $chatRoomId,
      ownerId: $buyerUserId,
      name: $name,
      productId: $productId,
      users: {
        data: [
          { userId: $sellerUserId },
          { userId: $buyerUserId }
        ]
      }
    }]) {
      affected_rows
    }
  }
`;


const CreateChatButton: React.FC<ReactProps> = (props) => {

  const snackbar = useSnackbar();
  const dispatch = useDispatch();

  const {
    openChatAfterwards = false,
  } = props;

  const chatCenterOpen = useSelector<GrandReduxState, boolean>(
    state => state.reduxModals.chatCenterOpen
  );

  const closeModal = () => {
    dispatch(Actions.reduxModals.TOGGLE_CHAT_CENTER_MODAL(false))
  }

  const openModal = () => {
    dispatch(Actions.reduxModals.TOGGLE_CHAT_CENTER_MODAL(true))
  }

  const [createChat, { data, loading }] = useMutation(
    CREATE_NEW_CHAT, {
      variables: {
        chatRoomId: `chat_${uuidv4()}`,
        sellerUserId: props.sellerUserId,
        buyerUserId: props.buyerUserId,
        productId: props.productId,
      },
      onCompleted: () => {
        snackbar.enqueueSnackbar(
          "Chat created.",
          { variant: "info" }
        )
      },
      onError: (e) => {
        snackbar.enqueueSnackbar(
          `Error creating chat: ${e}`,
          { variant: "error" }
        )
      },
  })

  return (
    <div>
      <ButtonLoading
        type="submit"
        style={{
          // width: '150px',
          height: 40,
        }}
        variant={"outlined"}
        color={"primary"}
        loadingIconColor={Colors.blue}
        replaceTextWhenLoading={true}
        loading={loading}
        disabled={!process.browser || props.disabled}
        // disabled={disabled}
        onClick={() => {
          createChat()
          if (props.onClickCallback) {
            props.onClickCallback()
          }
          if (props.openChatAfterwards) {
            openModal()
          }
        }}
        className={props.classes.button}
      >
        { props.title ? props.title : 'Send a message' }
      </ButtonLoading>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  title: string
  sellerUserId: string
  buyerUserId: string
  productId: string
  disabled?: boolean
  onClickCallback?(): void
  openChatAfterwards?: boolean
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
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
  },
});


export default withStyles(styles)( CreateChatButton );
