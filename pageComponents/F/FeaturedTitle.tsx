import React from "react";
import clsx from "clsx";
// Router
import Link from "next/link";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius, BoxShadows, isThemeDark } from "layout/AppTheme";
// Typings
import { Product } from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
import { Colors } from "layout/AppTheme";




const FeaturedTitle = (props: ReactProps) => {

  const { classes, product } = props;

  return (
    <div className={clsx(
      classes.featuredTitleRoot,
    )}>
      {
        process.browser &&
        <div className={classes.flexCol}>
          <div className={classes.flexItemWide}>
            <span className={classes.titleMake} >
              {product?.currentSnapshot?.make}
            </span>
            <span className={classes.collabX} >
              x
            </span>
            <span className={classes.titleModel}>
              {product?.currentSnapshot?.model}
            </span>
          </div>
          <div className={classes.flexItemWide}>
            <span className={classes.subtitle} >
              {product?.currentSnapshot?.title}
            </span>
          </div>
        </div>
      }
    </div>
  );
}



interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
}


const styles = (theme: Theme) => createStyles({
  featuredTitleRoot: {
    marginTop: '1rem',
    padding: '1.5rem 1rem 1rem 1rem',
    borderRadius: BorderRadius,
    position: 'absolute',
    top: '-10rem',
    left: 0,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  flexItemWide: {
    display: 'flex',
    flexBasis: '100%',
    width: '100%',
    flexWrap: "wrap",
  },
  titleMake: {
    fontSize: '2.5rem',
    lineHeight: '2.5rem',
    fontWeight: 700,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.black1A,
  },
  collabX: {
    fontSize: '2rem',
    fontWeight: 700,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: "0.5rem",
    marginRight: "0.5rem",
    lineHeight: '2.5rem',
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.black1A,
  },
  titleModel: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.black1A,
    lineHeight: '2.5rem',
  },
  subtitle: {
    fontSize: '1.5rem',
    fontWeight: 400,
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.black1A,
  },
});

export default withStyles(styles)( FeaturedTitle );


