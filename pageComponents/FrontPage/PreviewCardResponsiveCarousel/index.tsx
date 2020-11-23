import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
// Typings
import { Categories, Product } from "typings/gqlTypes";
// Responsiveness
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "@material-ui/core/Hidden";
import ProductRow from "pageComponents/FrontPage/FeaturedProductsMobile/ProductRow";
import PreviewCardRC from "./PreviewCardRC";




const PreviewCardResponsive: React.FC<PreviewCardResponsiveProps> = (props) => {

  const { product, refetch } = props;
  const featuredVariant = option(product).featuredVariant();
  const previewItem = option(product).featuredVariant.previewItems[0]();
  const previewItems = option(product).featuredVariant.previewItems([]);
  const original = option(previewItem).image.original();

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.only("sm"))

  return (
    <>
      {/* xs */}
      <Hidden only={["sm", "md", "lg", "xl"]}>
        <ProductRow
          product={product}
          // Products is not Product type
          // make sure you get Products from gateway, not directly fron Hasura
        />
      </Hidden>
      {/* sm */}
      <Hidden only={["xs", "md", "lg", "xl"]}>
        <div className={"PreviewCardResponseCarouselSm"} style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <PreviewCardRC
            previewItem={previewItem}
            previewItems={previewItems}
            product={product}
            title={option(product).currentSnapshot.title()}
            tagline={option(product).currentSnapshot.model()}
            category={option(product).category()}
            price={option(featuredVariant).price()}
            priceWas={option(featuredVariant).priceWas()}
            quantityAvailable={0}
            soldOutStatus={product?.soldOutStatus}
            fit={original
              ? (original.heightInPixels > original.widthInPixels)
              : false
            }
            jumboXl={true}
            listName={props.listName}
            loadCarouselPics={props.loadCarouselPics}
            setLoadCarouselPics={props.setLoadCarouselPics}
            productIndex={props.productIndex}
            refetch={refetch}
            viewWidth={100}
            viewWidthOffset={1 + 1} // account for padding/margin on each card
            // e.g. 1 cards = 1rem each
            // +1 rem for padding-left, padding-right (0.5rem each)
            // with when divided over 1 cards = 1 rem
          />
        </div>
      </Hidden>
      {/* md */}
      <Hidden only={["xs", "sm", "lg", "xl"]}>
        <PreviewCardRC
          previewItem={previewItem}
          previewItems={previewItems}
          product={product}
          title={option(product).currentSnapshot.title()}
          tagline={option(product).currentSnapshot.model()}
          category={option(product).category()}
          price={option(featuredVariant).price()}
          priceWas={option(featuredVariant).priceWas()}
          quantityAvailable={0}
          soldOutStatus={product?.soldOutStatus}
          fit={original
            ? (original.heightInPixels > original.widthInPixels)
            : false
          }
          jumboXl={true}
          listName={props.listName}
          loadCarouselPics={props.loadCarouselPics}
          setLoadCarouselPics={props.setLoadCarouselPics}
          productIndex={props.productIndex}
          refetch={refetch}
          viewWidth={50} // 50% vw each card
          viewWidthOffset={1/2 + 1} // account for padding/margin on each card
          // e.g. 2 cards = 1rem each
          // +1 rem for padding-left, padding-right (0.5rem each)
          // with when divided over 2 cards = 1/2 rem
        />
      </Hidden>
      {/* lg */}
      <Hidden only={["xs", "sm", "md", "xl"]}>
        <PreviewCardRC
          previewItem={previewItem}
          previewItems={previewItems}
          product={product}
          title={option(product).currentSnapshot.title()}
          tagline={option(product).currentSnapshot.model()}
          category={option(product).category()}
          price={option(featuredVariant).price()}
          priceWas={option(featuredVariant).priceWas()}
          quantityAvailable={0}
          soldOutStatus={product?.soldOutStatus}
          fit={original
            ? (original.heightInPixels > original.widthInPixels)
            : false
          }
          refetch={refetch}
          listName={props.listName}
          loadCarouselPics={props.loadCarouselPics}
          setLoadCarouselPics={props.setLoadCarouselPics}
          productIndex={props.productIndex}
          viewWidth={33.333} // 33% each card, with leeway for margins
          viewWidthOffset={1/3 + 1} // account for (minus) padding/margin on each card
          // e.g. 3 cards = 1rem each
          // +1 rem for padding-left, padding-right (0.5rem each)
          // with when divided over 3 cards = 1/3 rem
        />
      </Hidden>
      {/* xl */}
      <Hidden only={["xs", "sm", "md", "lg"]}>
        <PreviewCardRC
          previewItem={previewItem}
          previewItems={previewItems}
          product={product}
          title={option(product).currentSnapshot.title()}
          tagline={option(product).currentSnapshot.model()}
          category={option(product).category()}
          price={option(featuredVariant).price()}
          priceWas={option(featuredVariant).priceWas()}
          quantityAvailable={0}
          soldOutStatus={product?.soldOutStatus}
          fit={original
            ? (original.heightInPixels > original.widthInPixels)
            : false
          }
          refetch={refetch}
          listName={props.listName}
          loadCarouselPics={props.loadCarouselPics}
          setLoadCarouselPics={props.setLoadCarouselPics}
          productIndex={props.productIndex}
          showWishListButton={props.showWishListButton}
          viewWidth={25 - 0} // 25% per card, with leeway for margins
          viewWidthOffset={1/4 + 1} // account for padding/margin on each card
          // e.g. 4 cards = 1rem each
          // +1 rem for padding-left, padding-right (0.5rem each)
          // with when divided over 4 cards = 1/4 rem
        />
      </Hidden>
    </>
  )
}


interface PreviewCardResponsiveProps {
  product: Product;
  showWishListButton?: boolean;
  viewWidth?: number;
  listName?: string;
  loadCarouselPics?: any;
  setLoadCarouselPics?(a: any): any;
  productIndex?: number;
  refetch?(): void;
}


export default PreviewCardResponsive;
