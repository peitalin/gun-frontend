import React from "react";
import { oc as option } from "ts-optchain";
import { Categories, Product } from "typings/gqlTypes";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "../styles";
// MUI
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown"
// hooks
import { categorySelectors } from "utils/selectors";
import Link from "next/link";




const CategoryBar: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  return (
    <>
      <nav className={clsx(
        classes.baseBar,
        classes.categoryBarMobile,
        classes.categoryBar,
      )}>
        <div className={classes.baseBarInner}>
          <div className={classes.categoryBarInnerMobile}>

            <Link href={`/sale`}>
              <a className={classes.categoryLink}>
                <Typography className={clsx(
                  classes.categoryLinkAllMain,
                  classes.categoryLinkTextMainHeightMobile,
                )}>
                  Sale
                </Typography>
              </a>
            </Link>

            <Link href={`/free`}>
              <a className={classes.categoryLink}>
                <Typography className={clsx(
                  classes.categoryLinkAllMain,
                  classes.categoryLinkTextMainHeightMobile,
                )}>
                  Free
                </Typography>
              </a>
            </Link>

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
              option(props).categories([]).map(category => {
                return (
                  <a key={category.name}
                    className={classes.categoryLinkGroups}
                    href={`/categories/${category.name}`}
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
  staticCategories: string[];
}

export default withStyles(styles)( CategoryBar );
