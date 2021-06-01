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
import { Colors, BorderRadius, Gradients } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
// Components
import ErrorBounds from "components/ErrorBounds";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import TextInput from "components/Fields/TextInput";
import ButtonLoading from "components/ButtonLoading";
import DropdownInput from "components/Fields/DropdownInput";

// // Next
// import dynamic from 'next/dynamic'
// const DynamicPaymentMethods = dynamic(() => import('./PaymentMethods'))
import currency from 'currency.js';

import VisaButtonLoading from "pageComponents/P/PurchaseProductSummary/VisaButtonLoadingSSR";
import dynamic from "next/dynamic";

import VisaPurchasePromotion from "pageComponents/PromoteListings/PromotedSlotPurchaseModal/VisaPurchasePromotion"
// const VisaPurchasePromotion = dynamic(() => import("pageComponents/PromoteListings/PromotedSlotPurchaseModal/VisaPurchasePromotion"), {
//   loading: (props) => <VisaButtonLoading/>,
//   ssr: false,
// });

import { useApolloClient, useLazyQuery } from "@apollo/client";
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// gql
import { DASHBOARD_PRODUCTS_CONNECTION } from "queries/store-queries";
import {
  ADD_PRODUCT_TO_PROMOTED_LIST,
  REMOVE_PRODUCT_FROM_PROMOTED_LIST,
} from "queries/promoted_lists-queries";
import { useQuery, useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { formatDateTime } from "utils/dates";
import dayjs from 'dayjs';
import { Router } from "next/router";




const BuyPromotedSlotPage = (props: ReactProps) => {

  const {
    classes,
    asModal = true,
  } = props;

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const snackbar = useSnackbar();
  const c = (s) => currency(s/100, { formatWithSymbol: true }).format()

  const user = useSelector<GrandReduxState, UserPrivate>(
    state => state.reduxLogin.user
  );

  const [selectedProductOption, setSelectedProductOption] = React.useState({
    label: undefined,
    value: undefined,
  })

  const [getYourProducts, getYourProductsResponse] = useLazyQuery<QueryData, QueryVar>(
    DASHBOARD_PRODUCTS_CONNECTION, {
    variables: {
      searchTerm: "*",
      query: {
        limit: 50,
        offset: 0,
      }
    },
    onError: React.useCallback((e) => { console.log(e) }, []),
    onCompleted: React.useCallback(async (data) => { console.log(data) }, []),
    fetchPolicy: "network-only",
    // fetchPolicy: "cache-and-network",
    // fetchPolicy: "no-cache",
    // buggy, infinite request loop when using fetchPolicy: network-only
    // apollo devs are retards
    // https://github.com/apollographql/apollo-client/issues/6301
    errorPolicy: "all",
  });


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

  React.useEffect(() => {
    getYourProducts()
  }, [user])


  let connection = getYourProductsResponse?.data?.dashboardProductsConnection
  let yourProducts = connection?.edges?.map(({ node }) => node)

  let productOptions = createProductSuggestions(yourProducts)
  // console.log("productOptions: ", productOptions)

  let isAdmin = user?.userRole === Role.PLATFORM_ADMIN

  let selectedProductId = selectedProductOption?.value
  let selectedProduct = (yourProducts ?? []).find(p => p.id === selectedProductId);

  // console.log("your products: ", getYourProductsResponse?.data)
  // console.log("position: ", props.position)
  // console.log("selectedProductOption: ", selectedProductOption)
  // console.log("selectedProduct: ", selectedProduct)

  let {
    isExpired,
    expiresAt,
    anotherUserOwnsSlot,
    anotherUserOwnsSlotNow,
    userOwnsSlot,
    userOwnsSlotNow,
  } = isSlotExpiredYet(props.promotedSlot, user)

  let slotIsFreeToPurchase = !anotherUserOwnsSlotNow && !userOwnsSlotNow

  let showProductPickerDropdown = userOwnsSlotNow || slotIsFreeToPurchase

  // console.log("promotedSlot", props.promotedSlot)
  // console.log("promotedSlot.ownerId:", props.promotedSlot?.ownerId)
  // console.log("userId:", user?.id)
  // console.log("anotherUserOwnsSlot:", anotherUserOwnsSlot)
  // console.log("anotherUserOwnsSlotNow:", anotherUserOwnsSlotNow)
  // console.log("userOwnsSlot: ", userOwnsSlot)
  // console.log("userOwnsSlotNow: ", userOwnsSlotNow)

  // console.log("slotIsFreeToPurchase: ", slotIsFreeToPurchase)
  // console.log("expiresAt: ", expiresAt)
  // console.log("now: ", now)
  // console.log("not expired yet: ", now.unix() < expiresAt.unix())

  return (
    <ErrorBounds className={clsx(
      asModal ? classes.root : classes.rootPage,
      smDown ? classes.rootPaddingMobile : classes.rootPaddingDesktop,
    )}>
      <div className={classes.titleRow}>
        <Typography variant="h2" className={classes.title}>
          {`Buy Promoted Item Slot #${props.position + 1}`}
        </Typography>
        {
          asModal &&
          <IconButton
            onClick={() => props.closeModal()}
            className={classes.closeButton}
          >
            <ClearIcon/>
          </IconButton>
        }
      </div>

      {
        showProductPickerDropdown &&
        <div className={classes.boldSubtitle}>
          1. Pick a product to assign to slot. Must be published.
        </div>
      }

      {
        showProductPickerDropdown &&
        user.userRole === Role.PLATFORM_ADMIN &&
        <TextInput
          name="product.id"
          placeholder="Product ID"
          className={classes.textField}
          value={selectedProductId ?? ""}
          onChange={(e) => {
            setSelectedProductOption({
              label: e.target.value,
              value: e.target.value,
            })
          }}
          inputProps={{ style: { width: '100%' }}}
          disableInitialValidationMessage={true}
        />
      }
      {
        showProductPickerDropdown &&
        <DropdownInput
          className={classes.dropdownProducts}
          initialState={
            selectedProductId
              ? selectedProductOption
              : undefined
          }
          loading={getYourProductsResponse.loading}
          onChange={(option: SelectOption) => {
            setSelectedProductOption({
              label: option?.label,
              value: option?.value,
            })
          }}
          height={45}
          isClearable={true}
          options={productOptions}
          placeholder={"Choose a Product"}
        />
      }

      <div className={classes.helpMessages}>
        <div className={classes.helpMessage1}>
          {
            userOwnsSlot
            ? "You own this slot."
            : anotherUserOwnsSlotNow
              ? "Another user currently owns this slot."
              : "This slot can be purchased."
          }
        </div>
        <div className={classes.helpMessage2}>
          {
            // if someone currently owns slot
            (expiresAt === undefined)
              ? ``
              : (userOwnsSlotNow || anotherUserOwnsSlotNow)
                // and he currently owns the slot
                ? <>
                    <span> Ownership valid until: </span>
                    <span className={classes.time}>
                      {`${expiresAt?.format("YYYY-MM-DD HH:mm a")}`}
                    </span>
                  </>
                // or he no longer owns it
                : <>
                    <span> Ownership expired: </span>
                    <span className={classes.timeExpired}>
                      {`${expiresAt?.format("YYYY-MM-DD HH:mm a")}`}
                    </span>
                  </>
          }
        </div>
      </div>

      {
        // if no one currently owns slot
        !(userOwnsSlotNow || anotherUserOwnsSlotNow) &&
        <div className={classes.boldSubtitle}>
          { "2. Purchase slot for your product" }
        </div>
      }

      {
        selectedProductId &&
        props.promotedSlot?.id &&
        (slotIsFreeToPurchase) &&
        <VisaPurchasePromotion
          // className={"fadeIn"}
          product={selectedProduct}
          promotedSlot={props.promotedSlot}
          refetch={props.refetch}
          title={`Buy for ${c(props.promotedSlot?.reservePrice)} AUD`}
          showIcon={true}
          display={true}
          // selectedBid={props.selectedBid} // disabled, in future we may conduct auctions for slots
          // disableButton={!slotIsFreeToPurchase && isAdmin}
          // buttonHeight={xsDown ? '40px' : '40px'}
          handlePostPurchase={
            (p: PromotionPurchaseMutationResponse) => {
              // router.push("/orders")
              if (typeof props.closeModal === 'function') {
                props.closeModal()
              }
            }
          }
        />
      }

      {
        // if user owns this promotion-slot and it hasn't expired
        // or if it's an admin, then allow swapping/clearing promotion slot
        (userOwnsSlot || isAdmin) &&
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
                    productId: selectedProductId,
                    ownerId: user?.id,
                    position: props.promotedSlot?.position ?? props.position,
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
              || !selectedProductId
              || addProductToPromotedListResponse?.loading
            }
            variant="contained"
            color="secondary"
            // style={{ height: "40px" }}
          >
            <span style={{ marginLeft: '0.25rem' }}>
              {"Add Product to List"}
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
      }

    </ErrorBounds>
  );
}


const createProductSuggestions = (p: Product[]): GroupedSelectOption[] => {
  if (!p) {
    return []
  }

  const isAvailableProduct = (p: Product) => {
    return (
      p.isPublished
      && p.soldOutStatus === SoldOutStatus.AVAILABLE
      && !p.isSuspended
      && !p.isDeleted
      && !p.isSoldElsewhere
    )
  }

  let availableProducts = p.filter(p => {
    return isAvailableProduct(p)
  })
  let unavailableProducts = p.filter(p => {
    return !isAvailableProduct(p)
  })

  return [
    {
      label: "Available Products",
      options: [
        ...availableProducts.map(p => createProductOption(p))
      ],
    },
    {
      label: "Sold, Abandoned, Unpublished Products",
      options: [
        ...unavailableProducts.map(p => createProductOption(p))
      ],
    },
  ]
}

const createProductOption = (p: Product) => {
  return {
    label: `${p.currentSnapshot?.title} #${p.currentSnapshot?.serialNumber}`,
    value: p?.id,
  }
}

export const isSlotExpiredYet = (
  promotedSlot: PromotedSlot,
  user: UserPrivate,
) => {

  let _expiresAt = !!promotedSlot?.expiresAt
    ? dayjs(promotedSlot?.expiresAt)
    : undefined

  let now = dayjs(new Date())

  let isExpired = _expiresAt !== undefined
    ? now.unix() > _expiresAt.unix()
    : false

  let notExpiredYet = !isExpired

  let anotherUserOwnsSlot =
    !!promotedSlot?.ownerId // owner exists
    && promotedSlot?.ownerId !== user?.id // owner is not you

  let anotherUserOwnsSlotNow = anotherUserOwnsSlot && notExpiredYet

  let userOwnsSlot = promotedSlot?.ownerId === user?.id
  let userOwnsSlotNow = userOwnsSlot && notExpiredYet

  return {
    isExpired: isExpired,
    expiresAt: _expiresAt,
    userOwnsSlot: userOwnsSlot,
    userOwnsSlotNow: userOwnsSlotNow,
    anotherUserOwnsSlot: anotherUserOwnsSlot,
    anotherUserOwnsSlotNow: anotherUserOwnsSlotNow,
  }
}



export interface SelectOption {
  label: string;
  value: string | any;
}
export interface GroupedSelectOption {
  label: string;
  options: SelectOption[]
}

interface ReactProps extends WithStyles<typeof styles> {
  closeModal(): void;
  asModal?: boolean;
  promotedSlot: PromotedSlot
  position: number
  refetch?(): void;
}

interface QueryVar {
  searchTerm?: string;
  query?: ConnectionQuery;
}
interface QueryData {
  dashboardProductsConnection: ProductsConnection;
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
  root: {
    maxWidth: "720px",
    position: "relative",
    overflowY: 'visible', // let dropdown overhang modal
    height: "100%",
  },
  rootPage: {
    maxWidth: "720px",
    position: "relative",
  },
  rootPaddingDesktop: {
    padding: "2rem",
    paddingTop: "4rem",
  },
  rootPaddingMobile: {
    padding: "1rem",
    paddingTop: "4rem",
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    width: '100%',
    textAlign: 'center',
  },
  closeButton: {
    position: "absolute",
    right: '1rem',
    top: '1rem',
  },
  textField: {
    marginTop: "0.5rem",
  },
  dropdownProducts: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
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
  helpMessages: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: '2.5rem',
    marginBottom: '2.5rem',
  },
  helpMessage1: {
    color: Colors.blue,
    width: '100%',
    textAlign: 'center',
  },
  helpMessage2: {
    color: Colors.blue,
    width: '100%',
    textAlign: 'center',
  },
  time: {
    color: Colors.green,
    fontWeight: 600,
  },
  timeExpired: {
    color: Colors.red,
    fontWeight: 600,
  },
  boldSubtitle: {
    marginTop: '1rem',
    fontWeight: 600,
  },
});

export default withStyles(styles)( BuyPromotedSlotPage );

