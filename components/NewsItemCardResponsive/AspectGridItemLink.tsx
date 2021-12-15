import React from "react";
import clsx from "clsx";

import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BorderRadius, BoxShadows } from "layout/AppTheme";
// Typings
import { NewsItem } from "typings/gqlTypes";
// Material UI
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
// Carousel
import AspectRatioConstraint from "components/AspectRatioConstraint";
import LinkLoading from "components/LinkLoading";




const AspectCarouselItemLink: React.FC<ReactProps> = (props) => {

  const {
    classes,
    disable = false,
  } = props;

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
              as={`/f/${props.productId}`}
              disable={disable}
            >
              <CardActionArea classes={{ root: classes.cardActionArea }}>
                {props.children}
              </CardActionArea>
            </LinkLoading>
          : <LinkLoading
              href={"/p/[productId]"}
              as={`/p/${props.productId}`}
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
  promotedSlotId: string
  productId: string
  disable?: boolean;
  style?: any;
}



export const styles = (theme: Theme) => createStyles({
  card: {
    borderRadius: `${BorderRadius}px ${BorderRadius}px 2px 2px `,
    backgroundColor: theme.palette.mode === 'dark'
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
