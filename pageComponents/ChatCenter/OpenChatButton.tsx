
import React from 'react';
import { oc as option } from "ts-optchain";
// Styles
import { Colors, BoxShadows } from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// typings
import { Chat_Rooms, Chat_Messages } from "typings/gqlTypes";
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
import Button from "@material-ui/core/Button";


const OpenChatButton: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props

  const user = useSelector<GrandReduxState, UserPrivate>(
    state => state.reduxLogin.user
  );
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(Actions.reduxModals.TOGGLE_CHAT_CENTER_MODAL(false))
  }

  const openModal = () => {
    dispatch(Actions.reduxConversation.SET_CURRENT_CONVERSATION_ID(props.chatRoomId))
    setTimeout(() => {
      dispatch(Actions.reduxModals.TOGGLE_CHAT_CENTER_MODAL(true))
    }, 0)
  }

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => openModal()}
    >
      { props.title ? props.title : "Orders" }
    </Button>
  )
};

interface ReactProps extends WithStyles<typeof styles> {
  asModal?: boolean
  title?: string
  productId: string
  chatRoomId: string
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


export default withStyles(styles)( OpenChatButton );
