import React from "react";
import { Categories, Product } from "typings/gqlTypes";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
// MUI
import Typography from "@material-ui/core/Typography";
import { useScrollYPosition } from "utils/hooks";
// hooks
import Link from "next/link";
import { Y_SCROLL_NAVBAR_SHOW } from "../constants";



const CategoryBarDesktop: React.FC<ReactProps> = (props) => {

  const {
    classes,
    isMainPage,
    isFeaturedPage,
    isStartPage,
    isSellPage,
  } = props;

  let y = useScrollYPosition()


  const smallOffset = !isMainPage && !isFeaturedPage && !isStartPage && !isSellPage
  // console.log("Y:", y)

  return (
    <nav className={clsx(
      classes.baseBarDashboard,
      classes.categoryBar,
      y >= Y_SCROLL_NAVBAR_SHOW ? classes.categoryBarShow : classes.categoryBarHidden,
      (smallOffset || y >= Y_SCROLL_NAVBAR_SHOW)
        ? classes.categoryBarTopOffsetSmall
        : classes.categoryBarTopOffsetBig,
    )}>
      <div className={classes.baseBarInnerDashboard}>
        <div className={classes.categoryBarInner}>

          <Link href={`/new`}>
            <a className={classes.categoryLink}>
              <Typography className={clsx(
                classes.categoryLinkTextMain,
                classes.categoryLinkTextMainHeight,
              )}>
                New
              </Typography>
            </a>
          </Link>

          <Link href={`/sale`}>

            <a className={classes.categoryLink}>
              <Typography className={clsx(
                classes.categoryLinkTextMain,
                classes.categoryLinkTextMainHeight,
              )}>
                Price Reduced
              </Typography>
            </a>
          </Link>

          <Link href="/categories">
            <a className={classes.categoryLinkGroups} >
              <Typography className={clsx(
                classes.categoryLinkTextMain,
                classes.categoryLinkTextMainHeight,
              )}>
                All Categories
              </Typography>
            </a>
          </Link>

          {
            (props?.categories ?? []).map(category => {
              // console.log("cateogyr: ", category)
              return (
                <Link key={category.id}
                  href="/categories/[categorySlug]"
                  as={`/categories/${category?.slug}`}
                >
                  <a className={classes.categoryLinkGroups}>
                    <Typography className={clsx(
                      classes.categoryLinkTextMain,
                      classes.categoryLinkTextMainHeight,
                    )}>
                      {category?.name}
                    </Typography>
                  </a>
                </Link>
              )
            })
          }
        </div>
      </div>
    </nav>
  );
};


interface ReactProps extends WithStyles<typeof styles> {
  categories: Categories[];
  // navbar positioning
  isMainPage: boolean
  isStartPage: boolean
  isSellPage: boolean
  isFeaturedPage: boolean
  isMobile: boolean
}

export default withStyles(styles)( CategoryBarDesktop );
