import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Graphql Queries
import {
  UserPrivate,
  ConnectionQuery,
  ProductsConnection,
  PromotedListItem,
  PromotedList,
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

// // Next
// import dynamic from 'next/dynamic'
// const DynamicPaymentMethods = dynamic(() => import('./PaymentMethods'))
import { refetchUser } from "layout/GetUser";
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




const BuyPromotedItemPage = (props: ReactProps) => {

  const {
    classes,
    asModal = true,
  } = props;

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const user = useSelector<GrandReduxState, UserPrivate>(
    state => state.reduxLogin.user
  );

  const [productId, setProductId] = React.useState("")

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
      console.log(data)
      if (typeof props.refetch === "function") {
        props.refetch()
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


  // React.useEffect(() => {
  //   refetchUser(apolloClient)
  // }, [])

  React.useEffect(() => {
    getYourProducts()
  }, [user])

  console.log("your products: ", getYourProductsResponse?.data)

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
            onClick={() => props.goBack()}
            className={classes.closeButton}
          >
            <ClearIcon/>
          </IconButton>
        }
      </div>

      <div>
        1. Add a Stripe credit card checkout here.
      </div>
      <div>
        2. Pick one of your products to assign to slot
      </div>
      <TextInput
        name="product.id"
        placeholder="Product ID"
        className={classes.textField}
        value={productId}
        onChange={(e) => {
          setProductId(e.target.value)
        }}
        inputProps={{ style: { width: '100%' }}}
        disableInitialValidationMessage={true}
      />
      <div>
        3. Purchase slot
      </div>
      <ButtonLoading
        onClick={async() => {
          await addProductToPromotedList({
            variables: {
              promotedListItemId: props.promotedListItem?.id,
              promotedListId: props.promotedListItem?.promotedListId,
              productId: productId,
              ownerId: user?.id,
              position: props.promotedListItem?.position ?? props.position,
            }
          })
        }}
        loadingIconColor={Colors.blue}
        replaceTextWhenLoading={true}
        loading={addProductToPromotedListResponse?.loading}
        disabled={addProductToPromotedListResponse?.loading || !productId}
        variant="contained"
        color="secondary"
        className={classes.buttonBlue}
        // style={{ height: "40px" }}
      >
        <span style={{ marginLeft: '0.25rem' }}>
          {"Add Product to List"}
        </span>
      </ButtonLoading>

      <ButtonLoading
        onClick={async() => {
          await removeProductFromPromotedList({
            variables: {
              promotedListItemId: props.promotedListItem?.id,
              promotedListId: props.promotedListItem?.promotedListId,
            }
          })
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
        className={classes.buttonRed}
        // style={{ height: "40px" }}
      >
        <span style={{ marginLeft: '0.25rem' }}>
          {"Clear Slot"}
        </span>
      </ButtonLoading>

    </ErrorBounds>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  goBack(): void;
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
    overflowY: "hidden",
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
    marginBottom: "0.5rem",
  },
  buttonBlue: {
    marginTop: "0.5rem",
    backgroundColor: Colors.blue,
    "&:hover": {
      backgroundColor: Colors.ultramarineBlue,
    },
  },
  buttonRed: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    backgroundColor: Colors.red,
    "&:hover": {
      backgroundColor: Colors.lighterRed,
    },
  },
});

export default withStyles(styles)( BuyPromotedItemPage );

