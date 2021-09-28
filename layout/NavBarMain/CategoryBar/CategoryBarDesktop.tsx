import React from "react";
import { Categories, Product } from "typings/gqlTypes";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import {
  Colors, isThemeDark,
} from "layout/AppTheme";
import { UserPrivate } from "typings/gqlTypes";
// MUI
import Typography from "@material-ui/core/Typography";
// import { useScrollYPosition } from "utils/hooks";
// hooks
import Link from "next/link";
import { useRouter } from "next/router";

import TriangleSvg from "../MainBar/TriangleSvg";
import { useTheme } from "@material-ui/core"
import {
  logoBackgroundColorDark,
  logoBackgroundColorDark2,
  logoBackgroundColorLight,
  logoBackgroundColorLight2,
} from "../styles"
import SearchIcon from '@material-ui/icons/Search';
import ArrowStripeIcon from "components/ArrowStripeIcon"



const CategoryBarDesktop: React.FC<ReactProps> = (props) => {

  const {
    classes,
    isMainPage,
    isFeaturedPage,
    isStartPage,
    isSellPage,
  } = props;

  const [hoverSearch, setHoverSearch] = React.useState(false)
  const [hoverStripeArrow, setHoverStripeArrow] = React.useState(false)

  let theme = useTheme()
  // let y = useScrollYPosition()

  // const alwaysShowBar = !isMainPage && !isFeaturedPage && !isStartPage && !isSellPage
  let router = useRouter()
  // console.log("router:", router.asPath)

  let emailVerified = props.user?.emailVerified

  return (
    <nav className={clsx(
      classes.baseBarDashboard,
      classes.categoryBar,
      //
      classes.categoryBarShow,
      classes.categoryBarTopOffsetSmall
    )}>
      <div className={clsx(
        classes.catBarInnerDashboard,
        classes.catBarInnerDashboardDesktop
      )}>
        <div className={classes.categoryBarInner}>


          {/* <Link href={`/sold`}>
            <a className={classes.categoryLink}>
              <Typography className={clsx(
                classes.categoryLinkTextMain,
                classes.categoryLinkTextMainHeight,
                router.pathname.startsWith('/sold') && classes.categoryLinkTextSelected,
              )}>
                Sold
              </Typography>
            </a>
          </Link> */}


          {/* {
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
                      router.asPath.startsWith(`/categories/${category?.slug}`) && classes.categoryLinkTextSelected,
                    )}>
                      {category?.name}
                    </Typography>
                  </a>
                </Link>
              )
            })
          } */}



          {
            emailVerified &&
            <Link href="/trending">
              <a className={classes.categoryLink} >
                <Typography className={clsx(
                  classes.categoryLinkTextMain,
                  router.asPath === '/trending' && classes.categoryLinkTextSelected,
                )}>
                  Trending
                </Typography>
              </a>
            </Link>
          }

          <Link href={`/new`}>
            <a className={classes.categoryLink}
              onMouseEnter={() => setHoverSearch(true)}
              onMouseLeave={() => setHoverSearch(false)}
            >
              <div className={clsx(
                classes.categoryLinkTextMain,
                router.asPath.startsWith('/new') && classes.categoryLinkTextSelected,
              )}>
                <SearchIcon style={{
                  marginRight: '0rem',
                  fill: (router.asPath.startsWith('/new') || hoverSearch)
                    ? isThemeDark(theme)
                      ? Colors.purple
                      : Colors.ultramarineBlue
                    : isThemeDark(theme)
                      ? Colors.uniswapLightGrey
                      : Colors.black
                }}/>
                Search
              </div>
            </a>
          </Link>


          <Link href="/sell">
            <a className={classes.categoryLink}
              onMouseEnter={() => setHoverStripeArrow(true)}
              onMouseLeave={() => setHoverStripeArrow(false)}
            >
              <ArrowStripeIcon
                className={clsx(
                  classes.categoryLinkTextMain,
                  router.asPath === '/sell' && classes.categoryLinkTextSelected,
                )}
                title={"Upload Listing"}
                color={
                  (router.asPath === '/sell' || hoverStripeArrow)
                    ? isThemeDark(theme)
                      ? Colors.purple
                      : Colors.ultramarineBlue
                    : isThemeDark(theme)
                      ? Colors.uniswapLightGrey
                      : Colors.black
                }
              />
            </a>
          </Link>


          {
            emailVerified &&
            <Link href="/trending-items">
              <a className={classes.categoryLink} >
                <Typography className={clsx(
                  classes.categoryLinkTextMain,
                  router.asPath === '/trending-items' && classes.categoryLinkTextSelected,
                )}>
                  Items
                </Typography>
              </a>
            </Link>
        }

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
  user: UserPrivate;
}

export default withStyles(styles)( CategoryBarDesktop );
