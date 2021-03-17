import React from 'react';
// Styles
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
// graphql
import { useMutation, useQuery } from '@apollo/client';
// typings
import { Chat_Rooms, Chat_Messages } from "typings/gqlTypes";
// components
import ButtonLoading from "components/ButtonLoading";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Snackbar
import { useSnackbar } from "notistack";
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { GrandReduxState, Actions } from 'reduxStore/grand-reducer';
import { CREATE_NEW_CHAT } from "queries/chat-mutations"





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
        sellerUserId: props.sellerUserId,
        buyerUserId: props.buyerUserId,
        productId: props.productId,
        name: props.name,
      },
      onCompleted: () => {
        snackbar.enqueueSnackbar(
          "Bidding room created.",
          { variant: "info" }
        )
      },
      onError: (e) => {
        snackbar.enqueueSnackbar(
          `Error creating bidding room: ${e}`,
          { variant: "error" }
        )
      },
  })

  return (
    <ButtonLoading
      type="submit"
      className={props.classes.chatButton}
      style={{
        // width: '150px',
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
    >
      { props.title ? props.title : 'Suggest a price' }
    </ButtonLoading>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  title: string
  sellerUserId: string
  buyerUserId: string
  productId: string
  name?: string
  disabled?: boolean
  onClickCallback?(): void
  openChatAfterwards?: boolean
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
  chatButton: {
    width: '100%',
    height: 40,
    borderRadius: BorderRadius,
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.purple
      : Colors.green,
    color: Colors.cream,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.purple}`
      : `1px solid ${Colors.green}`,
    "&:hover": {
      border: theme.palette.type === 'dark'
        ? `1px solid ${Colors.purple}`
        : `1px solid ${Colors.green}`,
      backgroundColor: theme.palette.type === 'dark'
        ? fade(Colors.purple, 0.9)
        : fade(Colors.green, 0.9),
    }
  },
});


export default withStyles(styles)( CreateChatButton );
