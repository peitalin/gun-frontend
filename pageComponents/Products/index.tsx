import React from "react";
import { useState } from "react";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Material UI
import Dialog from "@material-ui/core/Dialog";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Typings
import { Products } from "typings/gqlTypes";
// Components
import dynamic from "next/dynamic";
// import ProductCreatePage from "./ProductCreatePage";
import Loading from "components/Loading";
// Router
import { Colors } from "layout/AppTheme";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// GraphQL
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { GET_PRODUCTS } from "queries/gun-queries";




const ProductGallery: React.FC<ReactProps> = (props) => {

  const { classes, children } = props;

  const dispatch = useDispatch();

  // const theme = useTheme();
  // const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  // const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  // const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { loading, error, data } = useQuery<QueryData, QueryVar>(
    GET_PRODUCTS, {
    variables: {
    },
    ssr: true,
  })


  return (
    <div className={classes.outerContainer}>
      <div className={classes.flexRowInner}>
        <div className={clsx(classes.productColumn60, 'fadeInFast')}>
          {
            data && data.products &&
            <div> {JSON.stringify(data.products)} </div>
          }
        </div>
      </div>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}
interface QueryData {
  products: Products;
}
interface QueryVar {
}


const styles = (theme: Theme) => createStyles({
  modalBackdrop: {
    backgroundColor: "rgba(47, 57, 65, .85)",
  },
  modalPaperScrollPaper: {
    // maxHeight: "calc(100% - 32px)",
  },
  fullMaxHeight: {
    maxHeight: "100%",
    width: '100%',
  },
  outerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: Colors.darkWhite,
  },
  flexRowInner: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 1000,
  },
  productColumn60: {
    flexBasis: '60%',
    flexGrow: 1,
    minWidth: 360,
  },
  productColumn40: {
    flexBasis: '40%',
    flexGrow: 1,
    minWidth: 280,
  },
});


export default withStyles(styles)( ProductGallery );
