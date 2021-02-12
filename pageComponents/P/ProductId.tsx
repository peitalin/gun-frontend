import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { SoldOutStatus } from "typings/gqlTypes";
// GraphQL
import { useQuery, useApolloClient } from "@apollo/client";
// Typings
import { Product, ID, Product_Variants } from "typings/gqlTypes";
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
import { lgUpMediaQuery, col2MinWidth } from "./common";
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
  const lgUp = useMediaQuery(lgUpMediaQuery);

  // index for the featuredPreview Carousel
  const [index, setIndex] = React.useState(0);

  const router = useRouter();

  const productId: string = option(router).query.productId() as any;

  ///////// DATA

  const { loading, error, data, refetch } = useQuery<QueryData, QueryVar>(
    GET_PRODUCT, {
    variables: {
      productId: productId
    },
    ssr: true,
  })
  const product = option(data).getProductById() || props.initialProduct;

  ////////// VARIANTS
  const [
    selectedOption,
    setSelectedOption
  ] = React.useState<SelectedVariantProps>({
    label: "variant",
    value: option(product).featuredVariant() || {
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

  const variantOptions = option(product).currentVariants([])
    .filter(v => v?.soldOutStatus !== SoldOutStatus.AVAILABLE)
    .map(v => ({ label: v.variantName, value: v }))

  let isSoldOut = product?.soldOutStatus === SoldOutStatus.SOLD_OUT
  let isReserved = product?.soldOutStatus === SoldOutStatus.RESERVED
  let isAvailable = product?.soldOutStatus === SoldOutStatus.AVAILABLE

  const handleChangeVariantOption = (
    selectedOption: { label: string, value: Product_Variants }
  ) => {
    setSelectedOption(selectedOption)
  };

  React.useEffect(() => {
    if (
      option(product).featuredVariant.productId() &&
      (isSoldOut || isReserved)
    ) {
        setSelectedOption({
          label: option(product).featuredVariant.variantName(),
          value: option(product).featuredVariant(),
        })
    } else {

      let nextVariant = option(product).currentVariants([])
        .filter(v => v?.soldOutStatus !== SoldOutStatus.AVAILABLE)[0]

      if (!!nextVariant && nextVariant.variantName) {
        setSelectedOption({
          label: nextVariant.variantName,
          value: nextVariant,
        })
      }
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
    <ProductPageContainer
      product={product}
      loading={loading}
    >

      <ProductRowSection isMobileRow>
        <ImageGalleryMobile
          product={product}
          loading={loading}
          index={index}
          setIndex={setIndex}
        />
      </ProductRowSection>

      <ProductRowSection isTopRow>
        <FlexBasis66
          className={classes.paddingLeftRight1}
          // HiddenProps
          only={['xs']}
          implementation="css"
        >
          <ImageGalleryDesktop
            product={product}
            selectedOption={selectedOption}
            // product={undefined}
            //// sometimes SSR preload looks off when product is undefined
            //// replicate by setting product = undefined
            loading={loading}
            numberOfItemsTall={16}
            numberOfItemsWide={8}
            index={index}
            setIndex={setIndex}
          />
        </FlexBasis66>

        <FlexBasis33>
          <PurchaseProductSummary
            product={product}
            selectedOption={selectedOption}
            refetchProduct={refetch}
            // productLicense props
            variantOptions={variantOptions}
            handleChangeVariantOption={handleChangeVariantOption}
          />
        </FlexBasis33>
      </ProductRowSection>

      <ProductRowSection isBottomRow>
        <FlexBasis66 className={classes.paddingLeftRight1}>
          {
            product &&
            <ProductDetails
              product={product}
              selectedOption={selectedOption}
            />
          }
        </FlexBasis66>
        <FlexBasis33>
          <>
            recommendations
          {/* <ProductPageRecommendations
            index={index}
            setIndex={setIndex}
            currentlyViewingProductIdOrSlug={productId}
          /> */}
          </>
        </FlexBasis33>
      </ProductRowSection>

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
  }
});


export default withStyles(styles)( Products );
