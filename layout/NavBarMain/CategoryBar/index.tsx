import React from "react";
import { Categories, Product } from "typings/gqlTypes";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "../styles";
// Apollo
import { GET_PRODUCT_CATEGORIES } from "queries/categories-queries";
import { useQuery, useApolloClient } from "@apollo/client";
import { categorySelectors } from "utils/selectors";
// MUI
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown"
import Hidden from "components/HiddenFix";
// hooks
import Link from "next/link";
// Components
import CategoryBarDesktop from "./CategoryBarDesktop";
import CategoryBarMobile from "./CategoryBarMobile";
import { useCategoriesList } from "./categoryHooks";



const CategoryBar: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  // const [expandCategories, setExpandCategories] = React.useState(false)
  let { categories, staticCategories } = useCategoriesList()

  return (
    <nav className={props.className}>
      <Hidden mdDown implementation="css">
        <CategoryBarDesktop
          categories={categories}
          staticCategories={staticCategories}
        />
      </Hidden>
      {/* <Hidden lgUp implementation="css">
        <CategoryBarMobile
          categories={categories}
          staticCategories={staticCategories}
        />
      </Hidden> */}
    </nav>
  );
};



interface ReactProps extends WithStyles<typeof styles> {
  className?: any;
}
interface QueryData {
  categories: Categories[]
}

interface CategoriesExpandedProps {
  categories: Categories[]
  expandCategories: boolean;
  hideExpandCategories(): void;
}

export default withStyles(styles)( CategoryBar );
