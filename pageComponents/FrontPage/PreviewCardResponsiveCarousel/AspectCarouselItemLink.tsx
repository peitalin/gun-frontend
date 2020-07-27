import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";

import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import WishlistIcon from "components/WishlistIcon";
import DiscountBadge from "components/DiscountBadge";
// Carousel
import AirItemWide from "components/AirCarousel/AirItemWide";
import AirCarousel from "components/AirCarousel";
import { useScrollXPosition, useCalcNumItemsFromWindowWidth } from "utils/hooks";
import AspectRatioConstraint from "components/AspectRatioConstraint";
import PreviewImageEmpty from "./PreviewImageEmpty";
import { styles } from "./styles";




const AspectCarouselItemLink: React.FC<CarouselItemWrapperProps> = (props) => {

  const {
    i,
    classes,
    shouldLoadImage,
    setLoadCarouselPics,
    productIndex,
    productId,
  } = props;

  return (
    <AirItemWide
      showNumItems={1}
      title={""}
      disableDither={true}
      removePaddingBottom={true}
      removeMarginBottom={true}
    >
      <Card
        className={classes.card}
        classes={{ root: classes.cardRoot }}
        onMouseOver={() => {
          if (setLoadCarouselPics) {
            setLoadCarouselPics(s => {
              return { ...s, [productIndex]: true }
            })
          }
        }}
      >
        <Link
          href={"/p/[productId]"}
          as={`/p/${productId}`}
        >
          <a className={classes.flexRow100Width}>
            {
              shouldLoadImage({
                firstImage: i === 0 || i === 1, // load first 2 images
                productIndex: productIndex
              }) &&
              <CardActionArea classes={{ root: classes.cardActionArea }}>
                {props.children}
              </CardActionArea>
            }
          </a>
        </Link>
      </Card>
    </AirItemWide>
  )
}


interface CarouselItemWrapperProps extends WithStyles<typeof styles> {
  i: number;
  shouldLoadImage({ firstImage, productIndex }: {
    firstImage: boolean;
    productIndex: number
  }): boolean;
  setLoadCarouselPics(a: React.Dispatch<React.SetStateAction<any>>): void;
  productIndex: number;
  productId: string;
}



export default withStyles(styles)( AspectCarouselItemLink );
