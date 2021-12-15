import React from "react";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// GraphQL
import { Product, UserPrivate, Chat_Users } from "typings/gqlTypes";
// Material UI
import Typography from "@mui/material/Typography";
import ProductModelMake from "pageComponents/P/ProductDetails/ProductModelMake";
import { SelectedVariantProps } from "../ProductId";
// redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";

import ProductDescription from "./ProductDescription";
import dynamic from "next/dynamic";
// const ProductDescription = dynamic(
//   () => import("pageComponents/P/ProductDetails/ProductDescription"), {
//     loading: () => <Loading inline/>,
//     ssr: false,
//   }
// )



const ProductDetails = (props: ReactProps) => {

  const {
    classes,
  } = props;

  return (
    <div className={classes.productDetailsContainer}>
      {
        props?.product?.currentSnapshot &&
        <ProductModelMake product={props.product}/>
      }
      {
        props?.product?.currentSnapshot?.description &&
        <ProductDescription
          productName={props.product?.currentSnapshot?.title}
          productDescription={props.product?.currentSnapshot?.description}
        />
      }
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
}
interface QueryData {
  conversations: Chat_Users[]
}
interface QueryVar {
  // query: ConnectionQuery
}

const styles = (theme: Theme) => createStyles({
  productDetailsContainer: {
    position: "relative",
    wordWrap: 'break-word',
    marginBottom: '4rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
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
