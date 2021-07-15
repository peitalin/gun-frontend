import React from "react";
import { Categories, Product } from "typings/gqlTypes";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
// MUI
import Typography from "@material-ui/core/Typography";
// hooks
import Link from "next/link";
import { useRouter } from "next/router";




const CategoryBarMobile: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  let router = useRouter()


  return (
    <nav className={clsx(
      classes.baseBarDashboard,
      classes.categoryBar,
      classes.categoryBarMobile,
    )}>
      <div className={classes.catBarInnerDashboard}>
        <div className={classes.categoryBarInnerMobile}>

          <Link href={`/new`}>
            <a className={classes.categoryLink}>
              <Typography className={clsx(
                classes.categoryLinkAllMobile,
                router.asPath === '/new' && classes.categoryLinkTextSelected,
              )}>
                New
              </Typography>
            </a>
          </Link>

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


          {
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
          }

          <Link href={`/categories`}>
            <a className={classes.categoryLink}>
              <Typography className={clsx(
                classes.categoryLinkAllMobile,
                router.asPath === '/categories' && classes.categoryLinkTextSelected,
              )}>
                All Categories
              </Typography>
            </a>
          </Link>

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

export default withStyles(styles)( CategoryBarMobile );
