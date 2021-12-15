import React from "react";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors } from "layout/AppTheme";
import clsx from "clsx";
// Typings
import { Product, ProductsConnection } from "typings/gqlTypes";
// Paginator hooks
import YouMayAlsoLikeRecommendations from "./YouMayAlsoLikeRecommendations";



const YouMayAlsoLike = (props: ReactProps) => {

  const { classes, title, initialProducts } = props;
  // console.log("currenProductid", props.currentlyViewingProductIdOrSlug)

  return (
    <div className={classes.recommendationsContainer}
      style={{ maxWidth: props.maxWidth || 1160 }}
    >
      <YouMayAlsoLikeRecommendations
        count={8}
        title={title}
      />
    </div>
  )
}





interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  initialProducts?: ProductsConnection;
  maxWidth?: number | string | "unset";
  currentlyViewingProductIdOrSlug?: string;
}


const styles = (theme: Theme) => createStyles({
  recommendationsContainer: {
    marginTop: '1rem',
    width: '100%',
  },
});


export default withStyles(styles)( YouMayAlsoLike );







