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
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BorderRadius, Gradients } from "layout/AppTheme";
// Material UI
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
// Components
import ErrorBounds from "components/ErrorBounds";
import TextInput from "components/Fields/TextInput";
import DropdownInput from "components/Fields/DropdownInput";
import PromotedSlotStatus from "./PromotedSlotStatus";
import VisaPurchasePromotion from "pageComponents/PromoteListings/PromotedSlotPurchaseModal/VisaPurchasePromotion"
import AddRemoveProductButtons from "./AddRemoveProductButtons";

import { useLazyQuery } from "@apollo/client";
// media query
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// gql
import { DASHBOARD_PRODUCTS_CONNECTION } from "queries/store-queries";
import { useSnackbar } from "notistack";
import { formatDateTime } from "utils/dates";
import { asCurrency as c } from "utils/prices";

import {
  createProductSuggestions,
  isSlotExpiredYet,
  SelectOption,
} from "./utils";




const BuyPromotedSlotPage = (props: ReactProps) => {

  const {
    classes,
    promotedSlot,
    user,
  } = props;

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('md'));
  const snackbar = useSnackbar();

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


  React.useEffect(() => {
    getYourProducts()
  }, [user])


  let connection = getYourProductsResponse?.data?.dashboardProductsConnection
  let yourProducts = connection?.edges?.map(({ node }) => node)

  let productOptions = React.useMemo(
    () => createProductSuggestions(yourProducts)
  , [yourProducts])

  let isAdmin = user?.userRole === Role.PLATFORM_ADMIN

  let selectedProductId = selectedProductOption?.value
  let selectedProduct = (yourProducts ?? []).find(p => p.id === selectedProductId);

  // console.log("your products: ", getYourProductsResponse?.data)
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
  console.log("selectedProductId: ", selectedProductId)

  return (
    <ErrorBounds className={clsx(
      classes.root,
      smDown ? classes.rootPaddingMobile : classes.rootPaddingDesktop,
    )}>
      <div className={classes.titleRow}>
        <Typography variant="h2" className={classes.title}>
        {
          isAdmin
          ? `Edit Promoted Slot #${promotedSlot?.position + 1}`
          : `Buy Promoted Slot #${promotedSlot?.position + 1}`
        }
        </Typography>
        <IconButton
          onClick={() => props.closeModal()}
          className={classes.closeButton}
          size="large">
          <ClearIcon/>
        </IconButton>
      </div>

      {
        showProductPickerDropdown &&
        <div className={classes.boldSubtitle}>
          1. Pick a product to assign to slot. Must be published.
        </div>
      }

      {
        showProductPickerDropdown &&
        user?.userRole === Role.PLATFORM_ADMIN &&
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

      <PromotedSlotStatus
        user={user}
        promotedSlot={promotedSlot}
      />

      {
        // if no one currently owns slot
        !(userOwnsSlotNow || anotherUserOwnsSlotNow) &&
        <div className={classes.boldSubtitle}>
          {
            isAdmin
            ? "2. Admin can put a temporary product in this slot, or buy it"
            : "2. Purchase slot for your product"
          }
        </div>
      }

      {
        selectedProductId &&
        props.promotedSlot?.id &&
        slotIsFreeToPurchase &&
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
        <AddRemoveProductButtons
          closeModal={props.closeModal}
          user={user}
          promotedSlot={props.promotedSlot}
          refetch={props.refetch}
          selectedProductId={selectedProductId}
          // must be selectedProductId, not selectedProduct.id
        />
      }

    </ErrorBounds>
  );
}



interface ReactProps extends WithStyles<typeof styles> {
  closeModal(): void;
  user: UserPrivate;
  promotedSlot: PromotedSlot
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
  boldSubtitle: {
    marginTop: '1rem',
    fontWeight: 600,
  },
});

export default withStyles(styles)( BuyPromotedSlotPage );

