
import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import {
  Colors,
  BoxShadows,
  BorderRadius2x,
  BorderRadius,
  isThemeDark,
} from "layout/AppTheme";
// components
import { UserPrivate, Product } from "typings/gqlTypes";
// Material UI
import Typography from '@material-ui/core/Typography';
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import ResponsivePadding from "pageComponents/SellerDashboard/ResponsivePadding";

// graphql
import { useMutation, useQuery } from '@apollo/client';
// typings
import { ChatRoom, Message } from "typings/gqlTypes";
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
import CreateInitialBidForm from './CreateInitialBidForm';



const BiddingRoom: React.FC<ReactProps> = (props) => {

  const {
    classes,
    asModal = false,
  } = props

  const [modalOpen, setModalOpen] = React.useState(false)

  const dispatch = useDispatch();
  const theme = useTheme();
  const snackbar = useSnackbar()
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const user = useSelector<GrandReduxState, UserPrivate>(
    state => state.reduxLogin.user
  );
  const userId = user?.id


  return (
    <>
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(s => false)}
        fullScreen={false}
        fullWidth={false}
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
        <CreateInitialBidForm
          sellerUserId={props.sellerUserId}
          buyerUserId={userId}
          product={props.product}
          name={user?.defaultLicense?.licenseNumber}
          title={props.titleText}
          disabled={!userId}
        />
      </Dialog>
      <ButtonLoading
        type="submit"
        className={props.classes.chatButton}
        style={{
          // width: '150px',
        }}
        variant={"outlined"}
        color={"primary"}
        loadingIconColor={Colors.cream}
        replaceTextWhenLoading={true}
        // loading={loading}
        disabled={!process.browser || props.disabled}
        // disabled={disabled}
        onClick={() => {
          // createChat()
          setModalOpen(s => !s)
        }}
      >
        { props.title ? props.title : 'Suggest a price' }
      </ButtonLoading>
    </>
  )
};

interface ReactProps extends WithStyles<typeof styles> {
  asModal?: boolean
  title?: string
  titleText?: string
  sellerUserId: string
  product: Product
  name?: string
  disabled?: boolean
  openChatAfterwards?: boolean
}



const styles = (theme: Theme) => createStyles({
  root: {
    paddingTop: '1rem',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    background: 'transparent',
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
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaper: {
    // maxHeight: "calc(100% - 32px)",
    background: 'transparent',
    boxShadow: 'unset',
  },
  fullMaxHeight: {
    maxHeight: "100%",
  },
  chatButton: {
    height: 40,
    width: '100%',
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


export default withStyles(styles)( BiddingRoom );
