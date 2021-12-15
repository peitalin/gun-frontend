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
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Components
import ButtonLoading from "components/ButtonLoading";
import {
  ADD_PRODUCT_TO_PROMOTED_LIST,
  REMOVE_PRODUCT_FROM_PROMOTED_LIST,
} from "queries/promoted_lists-queries";
import { useQuery, useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { isSlotExpiredYet } from "./utils";




const AddRemoveProductButtons = (props: ReactProps) => {

  const {
    classes,
    promotedSlot,
    user,
  } = props;

  const snackbar = useSnackbar();

  const [
    addProductToPromotedList,
    addProductToPromotedListResponse
  ] = useMutation<MData1, MVar1>(
    ADD_PRODUCT_TO_PROMOTED_LIST, {
    variables: {
      promotedSlotId: undefined,
      promotedListId: undefined,
      productId: undefined,
      ownerId: user?.id,
      position: undefined,
    },
    onError: React.useCallback((e) => {
      console.log(e)
      if (e?.message?.includes("duplicate")) {
        // promoted_slots_promoted_list_id_product_id_key
        snackbar.enqueueSnackbar(
          `This list already has that product`,
          { variant: "error" }
        )
      } else {
        snackbar.enqueueSnackbar(`${e}`, { variant: "error" })
      }
    }, []),
    onCompleted: React.useCallback(async (data) => {
      // console.log(data)
      if (typeof props.refetch === "function") {
        props.refetch()
      }
      if (typeof props.closeModal === 'function') {
        props.closeModal()
      }
    }, []),
  });


  const [
    removeProductFromPromotedList,
    removeProductFromPromotedListResponse
  ] = useMutation<MData2, MVar2>(
    REMOVE_PRODUCT_FROM_PROMOTED_LIST, {
    variables: {
      promotedSlotId: undefined,
      promotedListId: undefined,
    },
    onError: React.useCallback((e) => {
      console.log(e)
      snackbar.enqueueSnackbar(`${e}`, { variant: "error" })
    }, []),
    onCompleted: React.useCallback(async (data) => {
      console.log(data)
      if (typeof props.refetch === "function") {
        props.refetch()
      }
    }, []),
  });


  let isAdmin = user?.userRole === Role.PLATFORM_ADMIN


  let {
    isExpired,
    expiresAt,
    anotherUserOwnsSlot,
    anotherUserOwnsSlotNow,
    userOwnsSlot,
    userOwnsSlotNow,
  } = React.useMemo(
    () => isSlotExpiredYet(props.promotedSlot, user),
    [props.promotedSlot, user]
  )
  console.log("selectedProductId 2: ", props.selectedProductId)

  return (
    <div className={classes.buttonsBox}>
      <ButtonLoading
        className={classes.buttonBlue}
        onClick={async() => {

          if (anotherUserOwnsSlotNow) {
            snackbar.enqueueSnackbar(
              "Another user currently owns this slot, cannot edit",
              { variant: "info" }
            )
          } else if (
            // if you own the slot or you're the admin
            userOwnsSlotNow || isAdmin
          ) {
            await addProductToPromotedList({
              variables: {
                promotedSlotId: props.promotedSlot?.id,
                promotedListId: props.promotedSlot?.promotedListId,
                productId: props.selectedProductId,
                ownerId: user?.id,
                position: props.promotedSlot?.position,
              }
            })
          } else {
            snackbar.enqueueSnackbar(
              "Your ownership of this slot expired",
              { variant: "info" }
            )
          }
        }}
        loadingIconColor={Colors.cream}
        replaceTextWhenLoading={true}
        loading={addProductToPromotedListResponse?.loading}
        disabled={
          anotherUserOwnsSlotNow
          || !props.selectedProductId
          || addProductToPromotedListResponse?.loading
        }
        variant="contained"
        color="secondary"
        // style={{ height: "40px" }}
      >
        <span style={{ marginLeft: '0.25rem' }}>
          {"Add Product to Slot"}
        </span>
      </ButtonLoading>

      <ButtonLoading
        className={classes.buttonRed}
        onClick={async() => {
          if (userOwnsSlot) {
            await removeProductFromPromotedList({
              variables: {
                promotedSlotId: props.promotedSlot?.id,
                promotedListId: props.promotedSlot?.promotedListId,
              }
            })
          } else if (isAdmin) {
            snackbar.enqueueSnackbar(
              "Another user currently owns this slot, cannot clear",
              { variant: "info" }
            )
          } else {
          }
        }}
        loadingIconColor={Colors.cream}
        replaceTextWhenLoading={true}
        loading={removeProductFromPromotedListResponse?.loading}
        disabled={
          anotherUserOwnsSlotNow
          || removeProductFromPromotedListResponse?.loading
        }
        variant="contained"
        color="secondary"
        // style={{ height: "40px" }}
      >
        <span style={{ marginLeft: '0.25rem' }}>
          {"Clear Slot"}
        </span>
      </ButtonLoading>
    </div>
  );
}



interface ReactProps extends WithStyles<typeof styles> {
  closeModal(): void;
  user: UserPrivate;
  promotedSlot: PromotedSlot
  refetch?(): void;
  selectedProductId: string
}

interface MVar1 {
  promotedSlotId: string
  promotedListId: string
  productId: string
  ownerId?: string
  position?: number
}
interface MData1 {
  promotedSlot: PromotedSlot
}
interface MVar2 {
  promotedSlotId: string
  promotedListId: string
}
interface MData2 {
  promotedList: PromotedList
}



const styles = (theme: Theme) => createStyles({
  title: {
    width: '100%',
    textAlign: 'center',
  },
  buttonsBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
});

export default withStyles(styles)( AddRemoveProductButtons );

