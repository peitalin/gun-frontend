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




const CategoryBarMobile: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  return (
    <>
      <nav className={clsx(
        classes.baseBarDashboard,
        classes.categoryBarMobile,
        classes.categoryBar,
      )}>
        <div className={classes.baseBarInnerDashboard}>
          <div className={classes.categoryBarInnerMobile}>

            <Link href={`/new`}>
              <a className={classes.categoryLink}>
                <Typography className={clsx(
                  classes.categoryLinkAllMain,
                  classes.categoryLinkTextMainHeightMobile,
                )}>
                  New
                </Typography>
              </a>
            </Link>

            <Link href={`/sale`}>
              <a className={classes.categoryLink}>
                <Typography className={clsx(
                  classes.categoryLinkAllMain,
                  classes.categoryLinkTextMainHeightMobile,
                )}>
                  Price Reduced
                </Typography>
              </a>
            </Link>


            <Link href={`/categories`}>
              <a className={classes.categoryLink}>
                <Typography className={clsx(
                  classes.categoryLinkAllMain,
                  classes.categoryLinkTextMainHeightMobile,
                )}>
                  All Categories
                </Typography>
              </a>
            </Link>

            {
              (props?.categories ?? []).map(category => {
                return (
                  <a key={category.id}
                    className={classes.categoryLinkGroups}
                    href={`/categories/${category.slug}`}
                  >
                    <Typography className={clsx(
                      classes.categoryLinkTextMain,
                      classes.categoryLinkTextMainHeightMobile,
                    )}>
                      {category.name}
                    </Typography>
                  </a>
                )
              })
            }
          </div>
        </div>
      </nav>
    </>
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
