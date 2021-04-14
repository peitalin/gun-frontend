import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, BoxShadows } from "layout/AppTheme";
// Typings
import {
  Product,
} from "typings/gqlTypes";
// Components
import ProductSearch from "./ProductSearch";
import ProductProfileForm from "./ProductProfileForm";
import DisplayRecentProductIds from "./DisplayRecentProductIds";

// Graphql
import { useQuery, useApolloClient } from "@apollo/client";
import {
  GET_PRODUCT,
  GET_RECENT_PRODUCTS,
} from "queries/products-queries";
// Snackbar
import { useSnackbar } from "notistack";
// router
import { useRouter } from "next/router";



const UserViewer: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const aClient = useApolloClient();
  const snackbar = useSnackbar();
  const router = useRouter();

 // state
  const [errorMsg, setErrorMsg] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);
  const [productId, setProductId] = React.useState(
    router?.query?.productId as any
  );
  const [product, setProduct] = React.useState<Product>(undefined);
  const [recentProducts, setRecentProducts] = React.useState<Product[]>([]);

  console.log("query: ", router?.query)


  const searchProduct = async(productId: string) => {
    try {
      const { loading, errors, data } = await aClient.query<QueryData, QueryVar>({
        query: GET_PRODUCT,
        variables: {
          productId: productId
        },
        fetchPolicy: "no-cache", // always do a network request, no caches
      })
      if (data.getProductById) {

        setProduct(data.getProductById)

        let urlPath = router.asPath.split('?')[0]
        router.push(
          `${router.pathname}?productId=${productId}`,
          `${urlPath}?productId=${productId}`,
          { shallow: true }
        )
      }
    } catch(e) {
      snackbar.enqueueSnackbar(`productId does not exist`, { variant: "error" })
    }
  }

  const getRecentProducts = async(limit: number, offset = 0) => {
    try {
      const { loading, errors, data } = await aClient.query<QueryData2, QueryVar2>({
        query: GET_RECENT_PRODUCTS,
        variables: {
          limit: limit,
          offset: offset,
        },
      })
      if (data.getRecentProducts) {
        console.log("recent users: ", data.getRecentProducts);
        setRecentProducts(data.getRecentProducts)
      }
    } catch(e) {
      snackbar.enqueueSnackbar(`recent users do not exist`, { variant: "error" })
    }
  }


  React.useEffect(() => {
    getRecentProducts(6, 0)
    if (!!router?.query?.productId) {
      let productId: string = router?.query?.productId as any
      setProductId(productId)
      searchProduct(productId)
    }
  }, [])


  // const admin = useSelector<GrandReduxState, UserPrivate>(
  //   state => state?.reduxLogin?.user
  // );

  if (!product?.id) {
    return (
      <div className={classes.sectionPaper}>
        <ProductSearch
          productId={productId}
          setProductId={setProductId}
          searchProduct={searchProduct}
          errorMsg={errorMsg}
          loading={loading}
        >
          <DisplayRecentProductIds
            recentProducts={recentProducts}
            setProductId={setProductId}
          />
        </ProductSearch>
      </div>
    )
  }

  return (
    <>
      <div className={classes.sectionPaper}>
        <ProductSearch
          productId={productId}
          setProductId={setProductId}
          searchProduct={searchProduct}
          errorMsg={errorMsg}
          loading={loading}
        >
          <DisplayRecentProductIds
            recentProducts={recentProducts}
            setProductId={setProductId}
          />
        </ProductSearch>
      </div>

      <div className={classes.sectionPaper}>
        <ProductProfileForm
          product={product}
          setProduct={setProduct}
          searchProduct={searchProduct}
        />
      </div>

    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  onSubmit(args: any): void;
  onClickDebugPrint(): void;
}

interface QueryData {
  getProductById: Product;
}
interface QueryVar {
  productId: string;
}
interface QueryData2 {
  getRecentProducts: Product[];
}
interface QueryVar2 {
  limit: number;
  offset: number;
}


const styles = (theme: Theme) => createStyles({
  searchRoot: {
  },
  sectionPaper: {
    padding: '3rem',
    marginBottom: '2rem',
    borderRadius: BorderRadius,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDark}`,
    backgroundColor: theme.palette.type === 'dark'
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.cream}`,
  },
  section: {
    margin: '2rem',
  },
  form: {
    width: '100%',
  },
});


export default withStyles(styles)( UserViewer );



