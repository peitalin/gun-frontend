import React from 'react';
// Styles
import {
  Colors,
  isThemeDark,
  Gradients,
  BorderRadius,
  BorderRadius4x,
  BoxShadows,
} from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
// graphql
import { useMutation, useQuery } from '@apollo/client';
// typings
import { ChatRoom, Product } from "typings/gqlTypes";
// components
import Typography from '@material-ui/core/Typography';
import ButtonLoading from "components/ButtonLoading";
import Button from "@material-ui/core/Button";
import TextInputAdorned from 'components/Fields/TextInputAdorned';
import { Rifm } from 'rifm';
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Snackbar
import { useSnackbar } from "notistack";
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { GrandReduxState, Actions } from 'reduxStore/grand-reducer';
import { CREATE_INITIAL_BID } from "queries/chat-mutations"
// router
import { useRouter } from "next/router";
// Formatting
import { formatCurrency, parseNumber} from "utils/currencyInput";
import { asCurrency as c } from "utils/prices";
// Validation
import ValidationErrorMsg from "components/Fields/ValidationErrorMsg";
import { validationSchemas } from "utils/validation";
import { useFormik } from 'formik';
import { useFocus } from "utils/hooks";



const CreateInitialBidForm: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const snackbar = useSnackbar();
  const router = useRouter();

  // const ref = React.useRef(null);
  // const focused = useFocus(ref);

  // RIFM - masking currency values
  const [displayedPrice, setDisplayedPrice] = React.useState('');
  const [offerPrice, setOfferPrice] = React.useState(undefined)



  const [createInitialBid, { data, loading }] = useMutation<MData, MVar>(
    CREATE_INITIAL_BID, {
      variables: {
        productId: props.product?.id,
        name: props.name, // name of the chatroom/bidding room
        // bid
        offerPrice: offerPrice,
        productSnapshotId: props.product?.currentSnapshot?.id,
        variantId: props.product?.featuredVariant?.variantId,
      },
      update: (cache, { data: { createInitialBid }}) => {
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
          `Error creating bid: ${e}`,
          { variant: "error" }
        )
      },
  })


  const formik = useFormik({
    initialValues: {
      offerPrice: 0,
    },
    validationSchema: validationSchemas.CreateInitialBid,
    onSubmit: async (values) => {
      // createChat()
      snackbar.enqueueSnackbar(
        `Placing Bid of ${c(values.offerPrice)}`,
        { variant: "info" }
      )
      console.log("formik onSubmit. OfferPrice: ", values.offerPrice)
      await createInitialBid({
        variables: {
          productId: props.product?.id,
          name: props.name,
          offerPrice: values.offerPrice,
          productSnapshotId: props.product?.currentSnapshot?.id,
          variantId: props.product?.featuredVariant?.variantId,
        }
      })
      setDisplayedPrice('')
      setOfferPrice(0)
      formik.resetForm();
    },
  });


  return (
    <form
      onSubmit={formik.handleSubmit}
      className={classes.createInitialBidFormRoot}
    >
      <div className={classes.flexRow}>
        <Typography variant="h4" className={classes.title}>
          { props.title ?? "Suggest a Price"}
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
            let dollars = parseNumber(value)
            setDisplayedPrice(dollars)
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

        <ValidationErrorMsg
          touched={formik.errors?.offerPrice}
          focused={true}
          errorMessage={formik.errors?.offerPrice}
          disableInitialValidationMessage={true}
          style={{
            bottom: "0.25rem",
            right: "0.5rem",
          }}
        />
      </div>

      <ButtonLoading
        type="submit" // submits formik
        className={classes.chatButton}
        style={{ }}
        variant={"outlined"}
        color={"primary"}
        loadingIconColor={Colors.cream}
        replaceTextWhenLoading={true}
        loading={loading}
        disabled={!process.browser || props.disabled}
        // disabled={disabled}
        onClick={() => { }}
      >
        { 'Create Bid' }
      </ButtonLoading>
    </form>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  sellerUserId: string
  buyerUserId: string
  product: Product
  title?: string // title shown on modal
  name?: string // name of the chatroom for backend
  disabled?: boolean
}

interface MData {
  createInitialBid: ChatRoom
}
interface MVar {
  // create chat room
  productId: string
  name: string
  messageLimit?: number
  // bid
  offerPrice: number
  productSnapshotId: string
  variantId: string
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
      ? Gradients.gradientUniswapDark.background
      : Gradients.gradientGrey.background,
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapDarkNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
  },
  flexRow: {
    position: "relative",
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '0.5rem',
  },
  title: {
    fontSize: "1.25rem",
    marginBottom: '0.5rem',
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
        ? fade(Colors.purple, 0.9)
        : fade(Colors.green, 0.9),
    }
  },
  bidInputWrapper: {
    margin: '1rem',
  },
  inputField: {
    flexGrow: 1,
    minWidth: 140,
  },
});


export default withStyles(styles)( CreateInitialBidForm );
