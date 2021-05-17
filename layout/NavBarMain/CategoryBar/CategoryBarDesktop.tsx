import React from "react";
import { Categories, Product } from "typings/gqlTypes";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
// MUI
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown"
// hooks
import Link from "next/link";
import { categorySelectors } from "utils/selectors";




const CategoryBarDesktop: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  return (
    <nav className={clsx(
      classes.baseBarDashboard,
      classes.categoryBar,
    )}>
      <div className={classes.baseBarInnerDashboard}>
        <div className={classes.categoryBarInner}>

          <Link href={`/sale`}>
            <a className={classes.categoryLink}>
              <Typography className={clsx(
                classes.categoryLinkTextMain,
                classes.categoryLinkTextMainHeight,
              )}>
                Sale
              </Typography>
            </a>
          </Link>

          <Link href={`/free`}>
            <a className={classes.categoryLink}>
              <Typography className={clsx(
                classes.categoryLinkTextMain,
                classes.categoryLinkTextMainHeight,
              )}>
                Free
              </Typography>
            </a>
          </Link>

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

          <Link href="/categories">
            <a
              className={classes.categoryLinkGroups}
            >
              <Typography className={clsx(
                classes.categoryLinkTextMain,
                classes.categoryLinkTextMainHeight,
              )}>
                All Categories
              </Typography>
            </a>
          </Link>

          {
            (props?.staticCategories ?? []).map(category => {
              // console.log("cateogyr: ", category)
              return (
                <Link key={category}
                  href="/categories/[categoryIdOrName]"
                  as={`/categories/${category}`}
                >
                  <a className={classes.categoryLinkGroups}>
                    <Typography className={clsx(
                      classes.categoryLinkTextMain,
                      classes.categoryLinkTextMainHeight,
                    )}>
                      {category}
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
  staticCategories: string[];
}

interface CategoriesExpandedProps {
  categories: Categories[]
  expandCategories: boolean;
  hideExpandCategories(): void;
}

export default withStyles(styles)( CategoryBarDesktop );
