
import React from 'react';
// Styles
import { Colors, BoxShadows, BorderRadius2x } from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// graphql
import { useSubscription } from '@apollo/client';
import { useApolloClient } from "@apollo/client";
import { EMIT_ONLINE_EVENT } from "queries/chat-mutations";
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
import ResponsivePadding from "pageComponents/SellerDashboard/ResponsivePadding";




const BiddingRoom: React.FC<ReactProps> = (props) => {

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
  const userId = user?.id


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

  return (
    <ResponsivePadding>
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
    </ResponsivePadding>
  )

  if (!asModal) {
    return (
      <ResponsivePadding>
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
      </ResponsivePadding>
    )
  } else {
    return (
      <Dialog
        open={chatCenterOpen}
        onClose={closeModal}
        fullScreen={false}
        fullWidth={true}
        // fullWidth={false}
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
    )
  }
};

interface ReactProps extends WithStyles<typeof styles> {
  asModal?: boolean
}


const styles = (theme: Theme) => createStyles({
  root: {
    paddingTop: '1rem',
    width: '100%',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    background: 'transparent',
  },
  chatContainer: {
    overflow: "hidden",
    // background: theme.colors.uniswapDarkNavy,
    // borderRadius: BorderRadius2x,
    // boxShadow: BoxShadows.shadow1.boxShadow,
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
    background: 'transparent',
    boxShadow: 'unset',
  },
  fullMaxHeight: {
    maxHeight: "100%",
    width: '100%',
  },
});


export default withStyles(styles)( BiddingRoom );
