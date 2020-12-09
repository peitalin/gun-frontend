import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// GraphQL
import { Product, UserPrivate, Chat_Users } from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
// Material UI
import Typography from "@material-ui/core/Typography";
import SellerProfile from "pageComponents/P/ProductDetails/SellerProfile";
import { SelectedVariantProps } from "../ProductId";
// redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";

// import ProductDescription from "./ProductDescription";
import dynamic from "next/dynamic";
const ProductDescription = dynamic(
  () => import("pageComponents/P/ProductDetails/ProductDescription"), {
    loading: () => <Loading inline/>,
    ssr: false,
  }
)
import CreateOfferSubscription from "./CreateOfferSubscription";



const ProductDetails = (props: ReactProps) => {

  const {
    classes,
    selectedOption,
  } = props;

  const productVariant = selectedOption.value
  const dispatch = useDispatch();
  const user = useSelector<GrandReduxState, UserPrivate>(s =>
    s.reduxLogin.user
  )

  return (
    <div className={classes.productDetailsContainer}>
      {
        option(props).product.store() &&
        <SellerProfile store={props.product.store}/>
      }
      {
        option(props).product.currentSnapshot.description() &&
        <ProductDescription
          productDescription={props.product?.currentSnapshot?.description}
        />
      }
      {
        option(user).id() &&
        <CreateOfferSubscription
          userId={user.id}
          product={option(props).product()}
        />
      }
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  selectedOption: SelectedVariantProps;
  product: Product;
}
interface QueryData {
  conversations: Chat_Users[]
}
interface QueryVar {
  // query: ConnectionOffsetQuery
}

const styles = (theme: Theme) => createStyles({
  productDetailsContainer: {
    height: "100%",
    position: "relative",
    wordWrap: 'break-word',
    marginBottom: '4rem',
  },
  title: {
    marginTop: '1.5rem',
    marginBottom: '1rem',
    fontWeight: 500,
  },
  productDescription: {
    maxHeight: "33vh",
    overflowY: 'hidden',
  },
});

export default withStyles(styles)( ProductDetails );
