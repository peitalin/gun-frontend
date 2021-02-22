import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import { SoldOutStatus } from "typings/gqlTypes";
// GraphQL
import { useQuery, useApolloClient } from "@apollo/client";
// Typings
import { Product, UserPrivate, Product_Variants } from "typings/gqlTypes";
import {
  GET_PRODUCT,
} from "queries/products-queries";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
import CategoryBreadcrumbs from "./ProductPageLayouts/CategoryBreadcrumbs";
import { FlexBasis33, FlexBasis66 } from "./ProductPageLayouts/FlexBasis";
import ProductPageContainer from "./ProductPageLayouts/ProductPageContainer";
import ProductRowSection from "./ProductPageLayouts/ProductRowSection";
import ProductColumnSection from "./ProductPageLayouts/ProductColumnSection";
import StickyDetailsSeller from "./PurchaseProductSummary/StickyDetailsSeller";
import StickyDetailsDealer from "./PurchaseProductSummary/StickyDetailsDealer";
// Redux
import { useSelector } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";

// GridImage
import ImageGalleryDesktop from "pageComponents/P/ImageGallery/ImageGalleryDesktop";
import ImageGalleryMobile from "pageComponents/P/ImageGallery/ImageGalleryMobile";
import PurchaseProductSummary from "pageComponents/P/PurchaseProductSummary";
import ErrorPage from "pages/_error";
// Router
import { useRouter } from "next/router";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { below1024Query, col2MinWidth } from "./common";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
// SSR
import ProductDetails from "pageComponents/P/ProductDetails";
import dynamic from "next/dynamic";
// const ProductDetails = dynamic(() => import("pageComponents/P/ProductDetails"), {
//   loading: () => <Loading/>,
//   ssr: false,
// })
// description rendered server-side may have inconsistencies
// with description rendered client-side,
// leading to error (description does not show)
// so only render description client-side with next/dynamic



const Products: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const below1024 = useMediaQuery(below1024Query);
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));

  // index for the featuredPreview Carousel
  const [index, setIndex] = React.useState(0);

  const router = useRouter();
  const productId: string = router?.query?.productId as any;

  const user = useSelector<GrandReduxState, UserPrivate>(s =>
    s.reduxLogin.user
  )

  ///////// DATA

  const { loading, error, data, refetch } = useQuery<QueryData, QueryVar>(
    GET_PRODUCT, {
    variables: {
      productId: productId
    },
    ssr: true,
  })
  const product = data?.getProductById || props.initialProduct;

  ////////// VARIANTS
  const [
    selectedOption,
    setSelectedOption
  ] = React.useState<SelectedVariantProps>({
    label: "variant",
    value: product?.featuredVariant || {
      productId: undefined,
      variantId: undefined,
      snapshotId: undefined,
      variantSnapshotId: undefined,
      position: 0,
      storeId: undefined,
      createdAt: undefined,
      price: undefined,
      priceWas: undefined,
      variantName: undefined,
      variantDescription: undefined,
      previewItems: [],
      isDefault: false,
      soldOutStatus: SoldOutStatus.AVAILABLE,
    } as any,
  });

  React.useEffect(() => {
    if (!!product?.featuredVariant?.variantId) {
      setSelectedOption({
        label: "variant",
        value: product?.featuredVariant
      })
    }
  }, [product])

  const variantOptions = (product?.currentSnapshot?.currentVariants ?? [])
    .map(v => ({ label: v.variantName, value: v }))

  const handleChangeVariantOption = (
    selectedOption: { label: string, value: Product_Variants }
  ) => {
    setSelectedOption(selectedOption)
  };

  React.useEffect(() => {
    if (product?.featuredVariant?.productId) {
      setSelectedOption({
        label: product?.featuredVariant?.variantName,
        value: product?.featuredVariant,
      })
    }
  }, [loading])


  if (product && product.isSuspended) {
    return <ErrorPage statusCode={400} message={"Product has been suspended"}/>
  }
  if (product && product.isDeleted) {
    return <ErrorPage statusCode={400} message={"Product has been deleted"}/>
  }
  if (product && !product.isPublished) {
    return <ErrorPage statusCode={400} message={"Product is not available"}/>
  }
  if (error) {
    return <ErrorPage statusCode={400} message={"Product cannot be found"}/>
  }

  return (
    <ProductPageContainer product={product} loading={loading}>

      <ProductColumnSection isMobileRow>
        <ImageGalleryMobile
          product={product}
          loading={loading && !product}
          index={index}
          setIndex={setIndex}
          selectedOption={selectedOption}
        />
      </ProductColumnSection>

      <FlexBasis66
        // flexGrow={mdDown} // do not add flexGrow, messes
        // up responsive imageGallery + floating purchaseSummary
        implementation="css"
      >
        <ProductColumnSection>
          {
            !xsDown &&
            <ImageGalleryDesktop
              product={product}
              selectedOption={selectedOption}
              // product={undefined}
              //// sometimes SSR preload looks off when product is undefined
              //// replicate by setting product = undefined
              loading={loading && !product}
              numberOfItemsTall={16}
              numberOfItemsWide={8}
              index={index}
              setIndex={setIndex}
            />
          }

          {
            // !lgDown && below1024 &&
            below1024 &&
            <FlexBasis33 className={clsx(
              below1024 ? classes.positionLgDown : classes.positionSticky,
              (!lgDown && below1024) && classes.minWidth440,
              // between 720px and 1024px, expand purchase card to minWidth 440px
              // to force position: sticky to position: relative
            )}>
              <>
                <PurchaseProductSummary
                  product={product}
                  selectedOption={selectedOption}
                  refetchProduct={refetch}
                  variantOptions={variantOptions}
                  handleChangeVariantOption={handleChangeVariantOption}
                />
                <StickyDetailsSeller
                  seller={product?.store?.user}
                  storeName={product?.store?.name}
                  below1024={below1024}
                />
                <StickyDetailsDealer
                  dealer={product?.currentSnapshot?.dealer}
                  below1024={below1024}
                />
              </>
            </FlexBasis33>
          }

          {
            product &&
            <ProductDetails
              product={product}
              selectedOption={selectedOption}
              // showProductId={
              //   user?.userRole === Role.PLATFORM_ADMIN ||
              //   user?.userRole === Role.PLATFORM_EDITOR
              // }
            />
          }
        </ProductColumnSection>
      </FlexBasis66>

      {
        !below1024 &&
        <FlexBasis33 className={clsx(
          below1024 ? classes.positionLgDown : classes.positionSticky,
          (!lgDown && below1024) && classes.minWidth440,
          // between 720px and 1024px, expand purchase card to minWidth 440px
          // to force position: sticky to position: relative
        )}>
          <>
            <PurchaseProductSummary
              product={product}
              selectedOption={selectedOption}
              refetchProduct={refetch}
              variantOptions={variantOptions}
              handleChangeVariantOption={handleChangeVariantOption}
            />
            <StickyDetailsSeller
              seller={product?.store?.user}
              storeName={product?.store?.name}
              below1024={below1024}
            />
            <StickyDetailsDealer
              dealer={product?.currentSnapshot?.dealer}
              below1024={below1024}
            />
          </>
        </FlexBasis33>
      }

    </ProductPageContainer>
  );
}




interface ReactProps extends WithStyles<typeof styles> {
  initialProduct: Product;
}
interface QueryData {
  getProductById: Product;
}
interface QueryVar {
  productId: string;
}
export interface SelectedVariantProps {
  label: string;
  value: Product_Variants;
}


const styles = (theme: Theme) => createStyles({
  paddingLeftRight1: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  positionSticky: {
    position: "sticky",
    top: "1rem",
    paddingRight: '1rem',
    //
    height: "100%",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  minWidth440: {
    // expand product purchase card to 400px when near 1024px, to
    // force flexbox layout to shift, and to change
    // position: sticky to position: relative
    minWidth: 440,
  },
  positionLgDown: {
    position: "relative",
    top: "1rem",
    padding: '0rem 1rem',
    //
    // height: "100%",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default withStyles(styles)( Products );
