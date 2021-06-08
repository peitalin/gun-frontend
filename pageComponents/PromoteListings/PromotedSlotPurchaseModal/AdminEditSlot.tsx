import React from "react";
import clsx from "clsx";
// Graphql Queries
import {
  UserPrivate,
  ConnectionQuery,
  ProductsConnection,
  PromotedSlot,
  PromotedList,
  Role,
  Product,
  PromotionPurchaseMutationResponse,
  SoldOutStatus,
} from "typings/gqlTypes";
// Styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Components
import ButtonLoading from "components/ButtonLoading";
import Typography from "@material-ui/core/Typography";
import TextInput from "components/Fields/TextInput";
import Switch from '@material-ui/core/Switch'
import {
  EDIT_PROMOTED_SLOT,
} from "queries/promoted_lists-mutations";
import { GET_PROMOTED_LIST } from "queries/promoted_lists-queries";

// Formatting
import TextInputAdorned from 'components/Fields/TextInputAdorned';
import { formatCurrency, parseNumber} from "utils/currencyInput";
import { asCurrency as c } from "utils/prices";
import { Rifm } from 'rifm';

import { useQuery, useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { isSlotExpiredYet } from "./utils";
import { useFormik } from "formik";
import { validationSchemas } from "utils/validation";




const AdminEditSlot = (props: ReactProps) => {

  const {
    classes,
    promotedSlot,
    user,
  } = props;

  const snackbar = useSnackbar();

  const [
    editPromotedSlot,
    editPromotedSlotResponse,
  ] = useMutation<MData1, MVar1>(
    EDIT_PROMOTED_SLOT, {
    variables: {
      promotedSlotId: undefined,
      isAvailableForPurchase: undefined,
      reservePrice: undefined,
      durationInHours: undefined,
    },
    onError: React.useCallback((e) => {
      snackbar.enqueueSnackbar(`${e}`, { variant: "error" })
    }, []),
    onCompleted: React.useCallback(async (data) => {
      console.log("promoted slot updated: ", data)
    }, []),
    update: (cache, { data }) => {

        let newPromotedSlot = data.editPromotedSlot
        console.log("newPromotedSlot: ", newPromotedSlot)

        const cacheData = cache.readQuery<QData1, QVar1>({
          query: GET_PROMOTED_LIST,
          variables: {
            promotedListId: promotedSlot?.promotedListId,
            limit: 4,
            offset: 0,
          },
        })
        console.log("CACHE DATA: ", cacheData)

        if (cacheData?.getPromotedList) {
          cache.writeQuery({
            query: GET_PROMOTED_LIST,
            variables: {
              promotedListId: promotedSlot?.promotedListId,
              limit: 4,
              offset: 0,
            },
            data: {
              getPromotedList: {
                promotedSlotsConnection: {
                  ...cacheData?.getPromotedList.promotedSlotsConnection,
                  edges: [
                    ...cacheData?.getPromotedList?.promotedSlotsConnection?.edges,
                    { node: newPromotedSlot }
                  ]
                },
                __typename: cacheData?.getPromotedList?.__typename,
                ...cacheData?.getPromotedList,
              }
            },
          })
        }
    },
  });

  // RIFM - masking currency values
  const [displayedPrice, setDisplayedPrice] = React.useState(
    c(promotedSlot?.reservePrice)
  );


  const formik = useFormik({
    initialValues: {
      promotedSlotId: promotedSlot?.id,
      isAvailableForPurchase: promotedSlot?.isAvailableForPurchase,
      reservePrice: promotedSlot?.reservePrice,
      durationInHours: promotedSlot?.durationInHours,
    },
    validationSchema: validationSchemas.EditPromotedSlot,
    onSubmit: async (values) => {
      console.log("dispatching values:", values)
      snackbar.enqueueSnackbar(
        `Updating Promoted Slot`,
        { variant: "info" }
      )
      await editPromotedSlot({
        variables: {
          promotedSlotId: values.promotedSlotId,
          isAvailableForPurchase: values.isAvailableForPurchase,
          reservePrice: values.reservePrice,
          durationInHours: values?.durationInHours,
        }
      })
    },
  });

  // console.log("durationInHours", formik.values.durationInHours)
  // console.log("promotedSLOOOOOT", promotedSlot)
  // console.log("formi errors", formik.errors)

  return (
    <form className={classes.buttonsBox}
      onSubmit={formik.handleSubmit}
    >
      <Typography variant="h3" className={classes.title}>
        Admin Edit Slot
      </Typography>
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
          formik.setFieldValue("reservePrice", cents)
          // multiple by 100 as formik/graphql takes cents, not dollars
        }}
      >
        {({ value, onChange }) => (
          <TextInputAdorned
            startAdornment={"$ "}
            // name={'reserve.price'} => { reserve: { price: "7" }}
            type="currency"
            // placeholder="0.00"
            placeholder={"Enter Reserve Price"}
            className={classes.inputField}
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

      <TextInput
        name="durationInHours"
        placeholder="Slot duration (hours)"
        className={classes.textField}
        value={formik.values.durationInHours ?? ''}
        onChange={(e) => {
          let n = parseInt(e.target.value ?? 0)
          if (0 < n && n < 1000) {
            formik.setFieldValue("durationInHours", n)
          } else if (n >= 1000) {
            formik.setFieldValue("durationInHours", 1000)
          } else {
            formik.setFieldValue("durationInHours", undefined)
          }
        }}
        inputProps={{ style: { width: '100%' }}}
        disableInitialValidationMessage={true}
      />

      <div className={classes.switchBox}>
        <Typography className={classes.subtitle}>
          Slot Available for Purchase
        </Typography>
        <Switch
          checked={formik.values?.isAvailableForPurchase}
          onChange={(e) => {
            console.log("checked:", e.target.checked)
            formik.setFieldValue("isAvailableForPurchase", e.target?.checked)
          }}
        />
      </div>

      <ButtonLoading
        className={classes.buttonBlue}
        type="submit"
        onClick={async() => {
        }}
        loadingIconColor={Colors.cream}
        replaceTextWhenLoading={true}
        loading={editPromotedSlotResponse?.loading}
        disabled={editPromotedSlotResponse?.loading}
        variant="contained"
        color="secondary"
        // style={{ height: "40px" }}
      >
        <span style={{ marginLeft: '0.25rem' }}>
          {`Update Promoted Slot`}
        </span>
      </ButtonLoading>

    </form>
  );
}



interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate;
  promotedSlot: PromotedSlot
}

interface MVar1 {
  promotedSlotId: string
  isAvailableForPurchase?: boolean
  reservePrice?: number
  durationInHours?: number
}
interface MData1 {
  editPromotedSlot: PromotedSlot
}
interface QVar1 {
  promotedListId: string,
  limit: number,
  offset: number,
}
interface QData1 {
  getPromotedList: PromotedList;
}


const styles = (theme: Theme) => createStyles({
  title: {
    width: '100%',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  buttonsBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: '2rem',
  },
  buttonBlue: {
    marginTop: "0.5rem",
    backgroundColor: Colors.blue,
    borderRadius: BorderRadius,
    maxWidth: 200,
    "&:hover": {
      backgroundColor: Colors.ultramarineBlue,
    },
  },
  buttonRed: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    backgroundColor: Colors.red,
    borderRadius: BorderRadius,
    maxWidth: 200,
    "&:hover": {
      backgroundColor: Colors.lighterRed,
    },
  },
  inputField: {
    flexGrow: 1,
    minWidth: 140,
    height: 40,
  },
  textField: {
    flexGrow: 1,
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  switchBox: {
    marginBottom: '1rem',
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontWeight: 600,
  },
});

export default withStyles(styles)( AdminEditSlot );

