import React from "react";
import clsx from "clsx";

import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, BoxShadows } from "layout/AppTheme";
// Typings
import { Product } from "typings/gqlTypes";
// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
// Carousel
import AspectRatioConstraint from "components/AspectRatioConstraint";
import LinkLoading from "components/LinkLoading";




const AspectCarouselItemLink: React.FC<CarouselItemLinkProps> = (props) => {

  const {
    classes,
    product,
  } = props;

  return (
    <AspectRatioConstraint>
      <Card
        className={classes.card}
        classes={{ root: classes.cardRoot }}
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
    </AspectRatioConstraint>
  )
}


interface CarouselItemLinkProps extends WithStyles<typeof styles> {
  product: Product;
}



export const styles = (theme: Theme) => createStyles({
  card: {
    borderRadius: `${BorderRadius}px ${BorderRadius}px 2px 2px `,
    backgroundColor: theme.palette.type === 'dark'
      ? theme.colors.uniswapDarkNavy
      : theme.colors.slateGrey,
    // backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23${patternColor}' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    transition: theme.transitions.create('border', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  cardRoot: {
    boxShadow: 'none',
    height: '100%',
  },
  cardActionArea: {
    height: '100%',
    width: '100%',
  },
});

export default withStyles(styles)( AspectCarouselItemLink );
