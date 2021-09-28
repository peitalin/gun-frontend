import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import {
  Colors, isThemeDark,
} from "layout/AppTheme";
import { Categories, UserPrivate } from "typings/gqlTypes";
// MUI
import Typography from "@material-ui/core/Typography";
// hooks
import Link from "next/link";
import { useRouter } from "next/router";
import SearchIcon from '@material-ui/icons/Search';
import ArrowStripeIcon from "components/ArrowStripeIcon"
import { useTheme } from "@material-ui/core"




const CategoryBarMobile: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  let theme = useTheme()
  let router = useRouter()

  const [hoverSearch, setHoverSearch] = React.useState(false)
  const [hoverStripeArrow, setHoverStripeArrow] = React.useState(false)

  let emailVerified = props.user?.emailVerified

  return (
    <nav className={clsx(
      classes.baseBarDashboard,
      classes.baseBarDashboardMobile,
      classes.categoryBar,
      classes.categoryBarMobile,
    )}>
      <div className={clsx(classes.catBarInnerDashboard)}>
        <div className={classes.categoryBarInnerMobile}>


          {/* <Link href={`/sale`}>
            <a className={classes.categoryLink}>
              <Typography className={clsx(
                classes.categoryLinkAllMobile,
                classes.categoryLinkTextHeightMobile,
                router.asPath === '/sale' && classes.categoryLinkTextSelected,
              )}>
                Price Reduced
              </Typography>
            </a>
          </Link> */}


          {/* {
            (props?.categories ?? []).map(category => {
              return (
                <a key={category.id}
                  className={classes.categoryLink}
                  href={`/categories/${category.slug}`}
                >
                  <Typography className={clsx(
                    classes.categoryLinkTextMain,
                    router.asPath === `/categories/${category.slug}` && classes.categoryLinkTextSelected,
                  )}>
                    {category.name}
                  </Typography>
                </a>
              )
            })
          } */}

          {
            emailVerified &&
            <Link href={`/trending`}>
              <a className={classes.categoryLink}>
                <Typography className={clsx(
                  classes.categoryLinkAllMobile,
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
                classes.categoryLinkAllMobile,
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

          <Link href={`/sell`}>
            <a className={classes.categoryLink}
              onMouseEnter={() => setHoverStripeArrow(true)}
              onMouseLeave={() => setHoverStripeArrow(false)}
            >
              <ArrowStripeIcon
                className={clsx(
                  classes.categoryLinkAllMobile,
                  router.asPath === '/sell' && classes.categoryLinkTextSelected,
                )}
                title={"Upload"}
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
            <Link href={`/trending-items`}>
              <a className={classes.categoryLink}>
                <Typography className={clsx(
                  classes.categoryLinkAllMobile,
                  router.asPath === '/trending-items' && classes.categoryLinkTextSelected,
                )}>
                  Items
                </Typography>
              </a>
            </Link>
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
  user: UserPrivate;
}

export default withStyles(styles)( CategoryBarMobile );
