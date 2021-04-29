import React from "react";
import clsx from "clsx";
// Graphql Queries
import {
  UserPrivate,
  ConnectionQuery,
  ProductsConnection,
  PromotedListItem,
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

import VisaPurchasePromotion from "pageComponents/PromoteListings/PromotedItemPurchaseModal/VisaPurchasePromotion"
// const VisaPurchasePromotion = dynamic(() => import("pageComponents/PromoteListings/PromotedItemPurchaseModal/VisaPurchasePromotion"), {
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
  GET_PROMOTED_LIST,
} from "queries/promoted_lists-queries";
import { useQuery, useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { formatDate } from "utils/dates";
import dayjs from 'dayjs';




const BuyPromotedItemPage = (props: ReactProps) => {

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
      promotedListItemId: undefined,
      promotedListId: undefined,
      productId: undefined,
      ownerId: user?.id,
      position: undefined,
    },
    onError: React.useCallback((e) => { console.log(e) }, []),
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
      promotedListItemId: undefined,
      promotedListId: undefined,
    },
    onError: React.useCallback((e) => { console.log(e) }, []),
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

  let expiresAt = dayjs(props?.promotedListItem?.expiresAt)
  let now = dayjs(new Date())
  let notExpiredYet = now.unix() < expiresAt.unix()


  let anotherUserOwnsSlot =
    !!props.promotedListItem?.ownerId // owner exists
    && props.promotedListItem?.ownerId !== user?.id // owner is not you
  let anotherUserOwnsSlotNow = anotherUserOwnsSlot && notExpiredYet

  let userOwnsSlot = props.promotedListItem?.ownerId === user?.id
  let userOwnsSlotNow = userOwnsSlot && notExpiredYet

  let slotIsFreeToPurchase = !anotherUserOwnsSlotNow && !userOwnsSlotNow

  // // console.log("promotedListItem", props.promotedListItem)
  // console.log("promotedListItem.ownerId:", props.promotedListItem?.ownerId)
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
          Buy this promoted item slot
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

      <div className={classes.boldSubtitle}>
        1. Pick a product to assign to slot. Must be published.
      </div>
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
      <DropdownInput
        className={classes.dropdownProducts}
        stateShape={
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

      <div className={classes.helpMessages}>
        <div>
          {
            userOwnsSlot
            ? "You own this slot."
            : "Another user owns this slot."
          }
        </div>
        <div>
          {
            // if someone currently owns slot
            (expiresAt !== undefined)
            && (userOwnsSlotNow || anotherUserOwnsSlotNow)
              // and he currently owns the slot
              ? `Ownership expires: ${expiresAt.format("YYYY-MM-DD HH:mm a")}`
              // or he no longer owns it
              : `Ownership expired: ${expiresAt.format("YYYY-MM-DD HH:mm a")}`
          }
        </div>
        <div className={classes.boldSubtitle}>
          {
            // if no one currently owns slot
            (expiresAt !== undefined || !(userOwnsSlotNow || anotherUserOwnsSlotNow))
            && "2. Purchase slot for your product"
          }
        </div>
      </div>


      {
        selectedProductId &&
        props.promotedListItem?.id &&
        (slotIsFreeToPurchase) &&
        <VisaPurchasePromotion
          // className={"fadeIn"}
          product={selectedProduct}
          promotedListItem={props.promotedListItem}
          refetch={props.refetch}
          title={`Buy for ${c(props.promotedListItem?.reservePrice)} AUD`}
          showIcon={true}
          display={true}
          // selectedBid={props.selectedBid} // disabled, in future we may conduct auctions for slots
          // disableButton={!slotIsFreeToPurchase && isAdmin}
          // buttonHeight={xsDown ? '40px' : '40px'}
          handlePostPurchase={
            (p: PromotionPurchaseMutationResponse) => {
              // router.push("/orders")
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
                    promotedListItemId: props.promotedListItem?.id,
                    promotedListId: props.promotedListItem?.promotedListId,
                    productId: selectedProductId,
                    ownerId: user?.id,
                    position: props.promotedListItem?.position ?? props.position,
                  }
                })
              } else {
                snackbar.enqueueSnackbar(
                  "Your ownership of this slot expired",
                  { variant: "info" }
                )
              }
            }}
            loadingIconColor={Colors.blue}
            replaceTextWhenLoading={true}
            loading={addProductToPromotedListResponse?.loading}
            disabled={anotherUserOwnsSlotNow}
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
                    promotedListItemId: props.promotedListItem?.id,
                    promotedListId: props.promotedListItem?.promotedListId,
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
            loadingIconColor={Colors.blue}
            replaceTextWhenLoading={true}
            loading={removeProductFromPromotedListResponse?.loading}
            disabled={
              removeProductFromPromotedListResponse?.loading
              || !props.promotedListItem?.productId
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
      && !p.isExcludedFromRecommendations
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
  promotedListItem: PromotedListItem
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
  promotedListItemId: string
  promotedListId: string
  productId: string
  ownerId?: string
  position?: number
}
interface MData1 {
  promotedListItem: PromotedListItem
}
interface MVar2 {
  promotedListItemId: string
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
  },
  rootPaddingMobile: {
    padding: "1rem",
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: "1rem",
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
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  boldSubtitle: {
    marginTop: "1rem",
    fontWeight: 600,
  },
});

export default withStyles(styles)( BuyPromotedItemPage );

