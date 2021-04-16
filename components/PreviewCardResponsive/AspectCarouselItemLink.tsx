import React from "react";
import clsx from "clsx";

import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import { Product } from "typings/gqlTypes";
// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Link from "next/link";
// Carousel
import AirItemWide from "components/AirCarousel/AirItemWide";
import LinkLoading from "components/LinkLoading";
import {
  styles,
} from "./styles";




const AspectCarouselItemLink: React.FC<CarouselItemLinkProps> = (props) => {

  const {
    i,
    classes,
    shouldLoadImage,
    productIndex,
    product,
  } = props;

  // Note: AirItemWide also constrains dimensions to 16:10,
  // hence the "aspect" name,
  let loadImage: boolean = false;
  if (typeof shouldLoadImage === 'function') {
    loadImage = shouldLoadImage({
      // firstImage: i === 0 || i === 1, // load first 2 images
      firstImage: i === 0, // load first image
      productIndex: productIndex
    })
  }
  // console.log("loadImage: ", loadImage)

  if (shouldLoadImage && props.onMouseOver) {
    return (
      <AirItemWide
        showNumItems={1}
        title={undefined}
        disableDither={true}
        removePaddingBottom={true}
        removeMarginBottom={true}
      >
        <Card
          className={classes.card}
          classes={{ root: classes.cardRoot }}
          onMouseOver={props.onMouseOver}
        >
          <LinkLoading
            href={"/p/[productId]"}
            as={`/p/${product?.id}`}
            disable={!product?.storeId}
          >
            {
              loadImage &&
              <CardActionArea classes={{ root: classes.cardActionArea }}>
                {props.children}
              </CardActionArea>
            }
          </LinkLoading>
        </Card>
      </AirItemWide>
    )
  } else {
    return (
      <AirItemWide
        showNumItems={1}
        title={undefined}
        disableDither={true}
        removePaddingBottom={true}
        removeMarginBottom={true}
      >
        <Card
          className={classes.card}
          classes={{ root: classes.cardRoot }}
          onMouseOver={props.onMouseOver}
        >
          <LinkLoading
            href={"/p/[productId]"}
            as={`/p/${product?.id}`}
            disable={!product?.storeId}
          >
            <CardActionArea classes={{ root: classes.cardActionArea }}>
              {props.children}
            </CardActionArea>
          </LinkLoading>
        </Card>
      </AirItemWide>
    )
  }
}


interface CarouselItemLinkProps extends WithStyles<typeof styles> {
  product: Product;
  i?: number;
  shouldLoadImage?({ firstImage, productIndex }: {
    firstImage: boolean;
    productIndex: number
  }): boolean;
  productIndex?: number;
  onMouseOver?(): void;
}



export default withStyles(styles)( AspectCarouselItemLink );
