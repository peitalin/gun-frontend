import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import { SoldOutStatus, Chat_Rooms } from "typings/gqlTypes";
// GraphQL
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
// Typings
import { Product, UserPrivate, Product_Variants, BidStatus, Role, Unique_Product_Views } from "typings/gqlTypes";
import {
  GET_PRODUCT,
  INSERT_UNIQUE_PRODUCT_VIEW,
} from "queries/products-queries";
import {
  GET_USER_BIDS_FOR_PRODUCT
} from "queries/chat-queries";
import { FlexBasis33, FlexBasis66 } from "pageComponents/P/ProductPageLayouts/FlexBasis";
import ProductPageContainer from "./ProductPageLayouts/ProductPageContainer";
import HeroImageSection from "./ProductPageLayouts/HeroImageSection";
import StickyDetailsBids from "pageComponents/P/PurchaseProductSummary/StickyDetailsBids";
import StickyDetailsSeller from "pageComponents/P/PurchaseProductSummary/StickyDetailsSeller";
import StickyDetailsDealer from "pageComponents/P/PurchaseProductSummary/StickyDetailsDealer";
// Redux
import { useSelector } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";

// GridImage
import ImageGalleryDesktop from "pageComponents/P/ImageGallery/ImageGalleryDesktop";
import ImageGalleryMobile from "pageComponents/P/ImageGallery/ImageGalleryMobile";
import PurchaseProductSummary from "pageComponents/P/PurchaseProductSummary";
import ErrorPage from "pages/_error";
//
import FeaturedTitle from "pageComponents/F/FeaturedTitle";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";
// Router
import { useRouter } from "next/router";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { below1024Query, col2MinWidth } from "pageComponents/P/common";
// SSR
import ProductDetails from "pageComponents/P/ProductDetails";
// import dynamic from "next/dynamic";
// const ProductDetails = dynamic(() => import("pageComponents/P/ProductDetails"), {
//   loading: () => <Loading/>,
//   ssr: false,
// })
// description rendered server-side may have inconsistencies
// with description rendered client-side,
// leading to error (description does not show)
// so only render description client-side with next/dynamic



const FeaturedProductId: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const below1024 = useMediaQuery(below1024Query);
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));

  // index for the featuredPreview Carousel
  const [index, setIndex] = React.useState(0);
  const [selectedBid, setSelectedBid] = React.useState(undefined);

  const router = useRouter();
  const productId: string = router?.query?.productId as any;

  const user = useSelector<GrandReduxState, UserPrivate>(s =>
    s.reduxLogin.user
  )

  const isAdmin = user?.userRole === Role.PLATFORM_ADMIN

  ///////// DATA

  const [
    getUserBidsForProduct,
    getUserBidsForProductResponse
  ] = useLazyQuery<QueryData2, QueryVar>(
    GET_USER_BIDS_FOR_PRODUCT, {
    variables: {
      productId: productId
    },
  })

  const [
    insertUniqueProductView,
    uniqueProductViewResponse
  ] = useMutation<MData3, MVar3>(
    INSERT_UNIQUE_PRODUCT_VIEW, {
    variables: {
      productId: productId,
      userId: user?.id,
      // sellerUserId: product?.store?.user?.id
      sellerUserId: undefined
    },
  })


  let userBids = (getUserBidsForProductResponse?.data?.getUserBidsForProduct?.messages ?? [])
    .map(m => m?.bid)
  // console.log("userBids: ", userBids)

  const { loading, error, data, refetch } = useQuery<QueryData, QueryVar>(
    GET_PRODUCT, {
    variables: {
      productId: productId
    },
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
    if (user?.id) {
      getUserBidsForProduct()
    }
    if (!!product?.featuredVariant?.variantId) {
      setSelectedOption({
        label: "variant",
        value: product?.featuredVariant
      })
      if (user?.id && product?.store?.user?.id) {
        insertUniqueProductView({
          variables: {
            productId: productId,
            userId: user.id,
            sellerUserId: product.store.user.id
          }
        })
      }
    }
  }, [user, product])


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

  let storeUserVerified = product?.sellerLicense?.verified;
  let productIsYours = product?.store?.user?.id === user?.id

  // if (!loading && product?.soldOutStatus === SoldOutStatus.SOLD_OUT) {
  //   return <ErrorPage statusCode={400} message={"Product has been sold"}/>
  // }
  if (!loading && product?.store?.isSuspended === true) {
    return <ErrorPage statusCode={400}
      message={"Store has been suspended"} className={classes.paddingTop1}/>
  }
  if (!loading && product?.isSuspended === true) {
    return <ErrorPage statusCode={400}
      message={"Product has been suspended"} className={classes.paddingTop1}/>
  }
  if (!loading && product?.isDeleted === true) {
    return <ErrorPage statusCode={404}
      message={"Product has been deleted"} className={classes.paddingTop1}/>
  }
  if (!loading && !product?.isPublished === true) {
    return <ErrorPage statusCode={403}
      message={"Product is not published"} className={classes.paddingTop1}/>
  }
  if (!loading && !productIsYours && storeUserVerified !== true) {
    let storeOwnerId = product?.store?.userId ?? product?.store?.user?.id
    return <ErrorPage statusCode={400}
      message={`Store's owner "${storeOwnerId}" has yet to be verified`} className={classes.paddingTop1}/>
  }
  if (error) {
    return <ErrorPage statusCode={404}
      message={"Product cannot be found"} className={classes.paddingTop1}/>
  }


  return (
    <ProductPageContainer product={product} loading={loading}>


      <HeroImageSection isMobile={mdDown}>
        {/* use this for both mobile and desktop */}
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
          isPromoted={true}
          disableModalPopup={mdDown}
        />
      </HeroImageSection>


      <div className={classes.lowerHalfContainer}>
        <FlexBasis66
          // flexGrow={mdDown} // do not add flexGrow, messes
          // up responsive imageGallery + floating purchaseSummary
          implementation="css"
        >
          <>
            <ShowOnMobileOrDesktopSSR desktop>
              <FeaturedTitle
                product={product}
                isMobile={false}
              />
            </ShowOnMobileOrDesktopSSR>
            <ShowOnMobileOrDesktopSSR mobile>
              <FeaturedTitle
                product={product}
                isMobile={true}
              />
            </ShowOnMobileOrDesktopSSR>
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
                    selectedBid={selectedBid}
                  />
                  {
                    userBids
                    .filter(bid => bid?.bidStatus === BidStatus.ACCEPTED)
                    .map(bid =>
                      <StickyDetailsBids
                        userBid={bid}
                        selectedBid={selectedBid}
                        setSelectedBid={setSelectedBid}
                        below1024={below1024}
                      />
                    )
                  }
                  <StickyDetailsSeller
                    seller={product?.store?.user}
                    product={product}
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
          </>
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
                selectedBid={selectedBid}
              />
              {
                userBids
                .filter(bid => bid?.bidStatus === BidStatus.ACCEPTED)
                .map(bid =>
                  <StickyDetailsBids
                    key={bid?.id}
                    userBid={bid}
                    selectedBid={selectedBid}
                    setSelectedBid={setSelectedBid}
                    below1024={below1024}
                  />
                )
              }
              <StickyDetailsSeller
                seller={product?.store?.user}
                product={product}
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
      </div>

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
interface QueryData2 {
  getUserBidsForProduct: Chat_Rooms;
}

interface MVar3 {
  productId: string;
  userId: string;
  sellerUserId: string;
}
interface MData3 {
  insertUniqueProductViews: Unique_Product_Views;
}

export interface SelectedVariantProps {
  label: string;
  value: Product_Variants;
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
    marginTop: "1rem",
    paddingRight: '1rem',
    //
    height: "100%",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  lowerHalfContainer: {
    position: "relative",
    maxWidth: 1024,
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
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
  width100: {
    width: '100%',
  },
  paddingTop1: {
    paddingTop: '4rem',
  },
});


export default withStyles(styles)( FeaturedProductId );
