import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import clsx from "clsx";
// Typings
import {
  Product,
  ProductEditInput,
  ID,
  StorePrivate,
} from "typings/gqlTypes";
// Components
import Loading from "components/Loading";
import LoadingBarSSR from "components/LoadingBarSSR";
import ErrorBounds from 'components/ErrorBounds';
import ErrorDisplay from "components/Error";
import ProductEdit from "pageComponents/ProductEdit";
// Material UI
import Typography from "@material-ui/core/Typography";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// redux
import { GrandReduxState } from "reduxStore/grand-reducer";
import { useDispatch } from "react-redux";
import { seedProductEditDataAction } from "pageComponents/ProductEdit/seedEditData";
// Graphql
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "queries/products-queries";
// router
import { useRouter } from "next/router";
import Redirect from "pageComponents/Redirect";
// SSR disable
import dynamic from "next/dynamic";
import { SellerProfileProps } from "layout/GetUser/SellerProfileWrapper";
const SellerProfileWrapper = dynamic(() => import("layout/GetUser/SellerProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";



const AdminDashboardHome = (props: ReactProps) => {
  // state
  const {
    classes
  } = props;

  const router = useRouter();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <MetaHeadersPage
        title="Edit Product - Seller Dashboard"
        robots="noindex"
      />
      <SellerProfileWrapper>
      {(dataUser: SellerProfileProps) => {
        return (
          <Redirect
            message={"Redirecting to products..."}
            redirectCondition={true}
            redirectDelay={1000}
            redirectRoute={"/admin/products"}
          />
        )
      }}
      </SellerProfileWrapper>
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
}
interface QueryData {
  getProductById: Product;
}
interface QueryVar {
  productId: ID;
}

export const styles = (theme: Theme) => createStyles({
  pageRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingDesktop: {
    padding: '2rem 2rem 2rem 2rem',
  },
  paddingMobile: {
    padding: '2rem 0rem 2rem 0rem',
  },
  rootOuter: {
    // backgroundColor: Colors.foregroundColor,
  },
  contentContainer: {
    flexBasis: '65%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    maxWidth: 800,
    marginTop: '2rem',
    padding: '0rem 1rem 2rem 1rem',
  },
  iconButton: {
    fontWeight: 600,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '0.5rem',
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
    "&:hover": {
      cursor: "pointer",
      color: Colors.red,
      transition: theme.transitions.create('color', {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      }),
    },
  },
  pad1rem: {
    padding: '1rem',
    width: '100%',
    textAlign: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  spaceTop: {
    marginTop: '2rem',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  subtitle: {
    marginTop: "2rem",
  },
  title: {
  },
});

export default withStyles(styles)( AdminDashboardHome );

