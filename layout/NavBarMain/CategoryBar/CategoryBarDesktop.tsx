import React from "react";
import { Categories, Product } from "typings/gqlTypes";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import {
  Colors, isThemeDark,
} from "layout/AppTheme";
// MUI
import Typography from "@material-ui/core/Typography";
import { useScrollYPosition } from "utils/hooks";
// hooks
import Link from "next/link";
import { useRouter } from "next/router";
import { Y_SCROLL_NAVBAR_SHOW } from "../constants";

import TriangleSvg from "../MainBar/TriangleSvg";
import { useTheme } from "@material-ui/core"
import {
  logoBackgroundColorDark,
  logoBackgroundColorDark2,
  logoBackgroundColorLight,
  logoBackgroundColorLight2,
} from "../styles"



const CategoryBarDesktop: React.FC<ReactProps> = (props) => {

  const {
    classes,
    isMainPage,
    isFeaturedPage,
    isStartPage,
    isSellPage,
  } = props;

  let theme = useTheme()
  // let y = useScrollYPosition()

  const alwaysShowBar = !isMainPage && !isFeaturedPage && !isStartPage && !isSellPage
  let router = useRouter()
  // console.log("router:", router.asPath)

  return (
    <nav className={clsx(
      classes.baseBarDashboard,
      classes.categoryBar,
      //
      classes.categoryBarShow,
      classes.categoryBarTopOffsetSmall
      // (y >= Y_SCROLL_NAVBAR_SHOW || alwaysShowBar)
      //   ? classes.categoryBarShow
      //   : classes.categoryBarHidden,
      // (y >= Y_SCROLL_NAVBAR_SHOW || alwaysShowBar)
      //   ? classes.categoryBarTopOffsetSmall
      //   : classes.categoryBarTopOffsetBig,
    )}>
      <div className={clsx(
        classes.catBarInnerDashboard,
        classes.catBarInnerDashboardDesktop
      )}>
        <div className={classes.categoryBarInner}>

          <Link href={`/new`}>
            <a className={classes.categoryLink}>
              <Typography className={clsx(
                classes.categoryLinkTextMain,
                router.asPath === '/new' && classes.categoryLinkTextSelected,
              )}>
                What's New
              </Typography>
            </a>
          </Link>

          {/* <Link href={`/sale`}>

            <a className={classes.categoryLink}>
              <Typography className={clsx(
                classes.categoryLinkTextMain,
                classes.categoryLinkTextMainHeight,
                router.pathname === '/sale' && classes.categoryLinkTextSelected,
              )}>
                Price Reduced
              </Typography>
            </a>
          </Link> */}


          {
            (props?.categories ?? []).map(category => {
              // console.log("cateogyr: ", category)
              return (
                <Link key={category.id}
                  href="/categories/[categorySlug]"
                  as={`/categories/${category?.slug}`}
                >
                  <a className={classes.categoryLink}>
                    <Typography className={clsx(
                      classes.categoryLinkTextMain,
                      router.asPath === `/categories/${category?.slug}` && classes.categoryLinkTextSelected,
                    )}>
                      {category?.name}
                    </Typography>
                  </a>
                </Link>
              )
            })
          }

          <Link href="/categories">
            <a className={classes.categoryLink} >
              <Typography className={clsx(
                classes.categoryLinkTextMain,
                router.asPath === '/categories' && classes.categoryLinkTextSelected,
              )}>
                All Categories
              </Typography>
            </a>
          </Link>
        </div>

        <TriangleSvg
          style1={{
            fill: isThemeDark(theme)
              ? logoBackgroundColorDark2
              : logoBackgroundColorLight2,
            opacity: 0,
          }}
          style2={{
            fill: isThemeDark(theme)
              ? logoBackgroundColorDark
              : logoBackgroundColorLight,
            filter: isThemeDark(theme)
              ? 'drop-shadow( -2px 0px 2px rgba(25, 25, 25, 0.2))'
              : 'drop-shadow( -2px 0px 2px hsla(0, 0%, 0%, 0.2))',
          }}
        />

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
