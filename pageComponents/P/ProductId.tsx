import React from "react";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
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
import CategoryBreadcrumbs from "./ProductPageLayouts/CategoryBreadcrumbs";
import { FlexBasis33, FlexBasis66 } from "./ProductPageLayouts/FlexBasis";
import ProductPageContainer from "./ProductPageLayouts/ProductPageContainer";
import ProductColumnSection from "./ProductPageLayouts/ProductColumnSection";
import StickyDetailsBids from "./PurchaseProductSummary/StickyDetailsBids";
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
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { below1024Query, col2MinWidth } from "./common";
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
  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const below1024 = useMediaQuery(below1024Query);
  const lgDown = useMediaQuery(theme.breakpoints.down('xl'));

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
    ssr: true,
  })

  let userBids = (getUserBidsForProductResponse?.data?.getUserBidsForProduct?.messages ?? [])
    .map(m => m?.bid)
  // console.log("userBids: ", userBids)

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

  if (!loading && product?.store?.isSuspended === true) {
    return <ErrorPage statusCode={400} message={"Store has been suspended"}/>
  }
  if (!loading && product?.isSuspended === true) {
    return <ErrorPage statusCode={400} message={"Product has been suspended"}/>
  }
  if (!loading && product?.isDeleted === true) {
    return <ErrorPage statusCode={404} message={"Product has been deleted"}/>
  }
  if (!loading && !product?.isPublished === true) {
    return <ErrorPage statusCode={403} message={"Product is not published"}/>
  }
  if (!loading && !productIsYours && storeUserVerified !== true) {
    let storeOwnerId = product?.store?.userId ?? product?.store?.user?.id
    return <ErrorPage statusCode={400}
      message={
        <div className={classes.errorMsg}>
          Store's owner
          {
            isAdmin
            ? <a className={classes.link} target="_blank"
                href={`/gov/users?userId=${storeOwnerId}`}
              >
                {storeOwnerId}
              </a>
            : <span>{storeOwnerId}</span>
          }
          has yet to be verified
        </div>
      }
    />
  }
  if (error) {
    return <ErrorPage statusCode={404} message={"Product cannot be found"}/>
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
    top: "4.5rem",
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
  errorMsg: {
    color: Colors.lightRed,
  },
  link: {
    marginLeft: "0.25rem",
    marginRight: "0.25rem",
    color: Colors.magenta,
    "&:hover": {
      color: Colors.blue,
    },
  },
});


export default withStyles(styles)( Products );
