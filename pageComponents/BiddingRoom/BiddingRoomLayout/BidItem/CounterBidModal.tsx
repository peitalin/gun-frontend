import React from 'react';
// Styles
import {
  Colors,
  isThemeDark,
  Gradients,
  BorderRadius,
  BorderRadius4x
} from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme, alpha } from "@material-ui/core/styles";
// graphql
import { useMutation, useQuery } from '@apollo/client';
// typings
import { ChatRoom, Product, Message } from "typings/gqlTypes";
// components
import ButtonLoading from "components/ButtonLoading";
import TextInputAdorned from 'components/Fields/TextInputAdorned';
import { Rifm } from 'rifm';
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Snackbar
import { useSnackbar } from "notistack";
// gql
import { SEND_COUNTER_BID_MESSAGE } from "queries/chat-mutations"
// router
import { useRouter } from "next/router";
// Formatting
import { formatCurrency, parseNumber} from "utils/currencyInput";
import { asCurrency as c } from "utils/prices";
// Validation
import { validationSchemas } from "utils/validation";
import { useFormik } from 'formik';

import TooltipToggle from "./TooltipToggle";
import IconButton from "@material-ui/core/IconButton";
import ReplyIcon from '@material-ui/icons/Reply';
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";



const CounterBidModal: React.FC<ReactProps> = (props) => {

  const {
    classes,
    bidDisabled,
  } = props;

  const snackbar = useSnackbar();
  const router = useRouter();

  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))

  // RIFM - masking currency values
  const [displayedPrice, setDisplayedPrice] = React.useState('');
  const [offerPrice, setOfferPrice] = React.useState(undefined)
  const [showModal, setShowModal] = React.useState(false)



  const [sendCounterBid, sendCounterBidResponse] = useMutation<MData, MVar>(
    SEND_COUNTER_BID_MESSAGE, {
      variables: {
        chatRoomId: props.chatRoomId,
        productId: props.product?.id,
        productSnapshotId: props.product?.currentSnapshot?.id,
        variantId: props.product?.featuredVariant?.variantId,
        offerPrice: offerPrice,
        counterBidId: props.counterBidId, // this bid will be DECLINED
      },
      update: (cache, { data: { sendBidMessage }}) => {
      },
      onCompleted: () => {
        snackbar.enqueueSnackbar(
          `Bid placed successfully.`,
          { variant: "success" }
        )
        router.push("/bids")
      },
      onError: (e) => {
        snackbar.enqueueSnackbar(
          `${e}`,
          { variant: "error", autoHideDuration: 9000 }
        )
      },
  })


  const formik = useFormik({
    initialValues: {
      offerPrice: 0,
    },
    validationSchema: validationSchemas.SendBid,
    onSubmit: async (values) => {
      // createChat()
      snackbar.enqueueSnackbar(
        `Placing Bid of ${c(values.offerPrice)}`,
        { variant: "info" }
      )
      console.log("formik onSubmit. OfferPrice: ", values.offerPrice)
      await sendCounterBid({
        variables: {
          chatRoomId: props.chatRoomId,
          productId: props.product?.id,
          productSnapshotId: props.product?.currentSnapshot?.id,
          variantId: props.product?.featuredVariant?.variantId,
          offerPrice: values.offerPrice,
        }
      })
      setDisplayedPrice('')
      setOfferPrice(0)
      formik.resetForm();
      setShowModal(false)
    },
  });



  return (
    <>
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        BackdropProps={{ classes: { root: classes.modalBackdrop } }}
        PaperProps={{ classes: { root: classes.modalPaperScrollPaper } }}
      >
        <form
          onSubmit={formik.handleSubmit}
          className={classes.createInitialBidFormRoot}
        >
          <div className={classes.flexRow}>
            <Typography variant="h4" className={classes.title}>
              Make a Counter Bid
            </Typography>
          </div>

          <div className={classes.flexRow}>
            <Rifm
              // $ need to be in regexp to prevent cursor jumping on backspace
              accept={/[\d.]/g}
              format={formatCurrency}
              value={displayedPrice}
              onChange={value => {
                // values before currency mask
                // multiple by 100 as formik/graphql takes cents, not dollars
                let displayDollars = parseNumber(value)
                let dollars = parseFloat(displayDollars)
                setDisplayedPrice(displayDollars)
                // console.log("dollars", dollars)
                let cents = Math.round(parseFloat((dollars * 100) as any)) // round: 200.9999 => 201
                // console.log('cents: ', cents)
                if (cents) {
                  setOfferPrice(cents)
                } else {
                  // setOfferPrice(undefined)
                }
                formik.setFieldValue("offerPrice", cents)
                // multiple by 100 as formik/graphql takes cents, not dollars
              }}
            >
              {({ value, onChange }) => (
                <TextInputAdorned
                  startAdornment={"$ "}
                  name={'bid'}
                  type="currency"
                  autoFocus="autofocus"
                  autoComplete={"new-password"}
                  // placeholder="0.00"
                  placeholder={"Enter a bid"}
                  className={classes.inputField}
                  // value={formik.values.offerPrice}
                  // onChange={formik.handleChange}
                  value={value || ""}
                  onChange={(e) => {
                    formik.handleChange(e)
                    e.persist()
                    onChange(e)
                  }}
                  inputProps={{ style: { width: '100%', marginLeft: '0.25rem' }}}
                />
              )}
            </Rifm>
          </div>
          <div className={classes.flexRow}>
            <Button
              type="submit"
              className={classes.modalButtons}
              variant={"outlined"}
              color={"secondary"}
              onClick={() => {}}
              // submit dispatches formik and then sendCounterBid()
            >
              Place Bid
            </Button>
            <Button
              className={classes.modalButtons}
              variant={"outlined"}
              color={"primary"}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Dialog>
      <TooltipToggle placement={"top"}
        title={"Counter Bid"}
        disabled={bidDisabled}
      >
        <span>
          <IconButton
            type="submit"
            className={clsx(
              mdDown ? classes.bidMsgButtonMobile : classes.bidMsgButton,
              // classes.bidMsgPurple,
              bidDisabled ? classes.bidMsgDisabled : classes.bidMsgPurple,
            )}
            onClick={() => setShowModal(true)}
            disabled={bidDisabled}
          >
            <ReplyIcon
              // className={classes.bidMsgPurple}
              className={bidDisabled ? null : classes.bidMsgPurple}
            />
          </IconButton>
        </span>
      </TooltipToggle>
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  chatRoomId: string
  product: Product
  name?: string
  bidDisabled: boolean
  counterBidId?: string
}

interface MData {
  sendBidMessage: Message[]
}
interface MVar {
  chatRoomId: string
  productId: string
  productSnapshotId: string
  variantId: string
  offerPrice: number
  counterBidId?: string
}

const styles = (theme: Theme) => createStyles({
  createInitialBidFormRoot: {
    width: '100%',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    padding: '2rem',
    maxWidth: 500,
    minWidth: 330,
    borderRadius: BorderRadius4x,
    background: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Gradients.gradientGrey.background,
  },
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaper: {
    maxHeight: "calc(100% - 32px)",
    maxWidth: '400px',
    width: '100%',
    borderRadius: BorderRadius4x,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: '0.5rem',
  },
  title: {
    fontSize: "1.25rem",
    marginBottom: '0.5rem',
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
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
        ? alpha(Colors.purple, 0.9)
        : alpha(Colors.green, 0.9),
    }
  },
  bidInputWrapper: {
    margin: '1rem',
  },
  inputField: {
    flexGrow: 1,
    minWidth: 140,
  },
  bidMsgButton: {
    color: Colors.cream,
    padding: '0rem', // safari alignment bug
    height: 36,
    width: 36,
  },
  bidMsgButtonMobile: {
    color: Colors.cream,
    padding: '0rem', // safari alignment bug
    marginLeft: '0.25rem',
    marginRight: '0.25rem',
    height: 36,
    width: 36,
  },
  bidMsgPurple: {
    fill: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
    "&:hover": {
      "& > span > svg": {
        fill: Colors.purple,
      }
    },
  },
  bidMsgDisabled: {
  },
  modalButtons: {
    marginTop: "0.5rem",
    minWidth: 150,
  },
});


export default withStyles(styles)( CounterBidModal );
