import React from "react";
import clsx from "clsx";

import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, BoxShadows } from "layout/AppTheme";
// Typings
import { NewsItem } from "typings/gqlTypes";
// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
// Carousel
import AspectRatioConstraint from "components/AspectRatioConstraint";
import LinkLoading from "components/LinkLoading";




const AspectCarouselItemLink: React.FC<ReactProps> = (props) => {

  const {
    classes,
    newsItem,
    disable = false,
  } = props;

  let product = newsItem?.product

  return (
    <AspectRatioConstraint>
      <Card
        className={classes.card}
        classes={{ root: classes.cardRoot }}
        style={props.style}
      >
        {
          props.promotedSlotId
          ? <LinkLoading
              href={"/f/[productId]"}
              as={`/f/${product?.id}`}
              disable={disable}
            >
              <CardActionArea classes={{ root: classes.cardActionArea }}>
                {props.children}
              </CardActionArea>
            </LinkLoading>
          : <LinkLoading
              href={"/p/[productId]"}
              as={`/p/${product?.id}`}
              disable={disable}
            >
              <CardActionArea classes={{ root: classes.cardActionArea }}>
                {props.children}
              </CardActionArea>
            </LinkLoading>
        }
      </Card>
    </AspectRatioConstraint>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  newsItem: NewsItem;
  disable?: boolean;
  promotedSlotId?: string
  style?: any;
}



export const styles = (theme: Theme) => createStyles({
  card: {
    borderRadius: `${BorderRadius}px ${BorderRadius}px 2px 2px `,
    backgroundColor: theme.palette.type === 'dark'
      ? theme.colors.uniswapDarkNavy
      : theme.colors.slateGrey,
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
