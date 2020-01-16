import React from "react";
import { oc as option } from "ts-optchain";
import { ProductCategory, Product } from "typings/gqlTypes";
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
            <a key={"all-categories"}
              className={classes.categoryLink}
              href={`/categories/all`}
            >
              <Typography className={clsx(
                classes.categoryLinkAllMain,
                classes.categoryLinkTextMainHeightMobile,
              )}>
                All Categories
              </Typography>
            </a>
            {
              props.staticCategories.map(category => {
                return (
                  <a key={category}
                    className={classes.categoryLinkGroups}
                    href={`/categories/${category}`}
                  >
                    <Typography className={clsx(
                      classes.categoryLinkTextMain,
                      classes.categoryLinkTextMainHeightMobile,
                    )}>
                      {category}
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
  categories: ProductCategory[];
  staticCategories: string[];
}

export default withStyles(styles)( CategoryBar );
