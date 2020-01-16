import React from "react";
import { oc as option } from "ts-optchain";
import { ProductCategory, Product } from "typings/gqlTypes";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "../styles";
// Apollo
import { GET_PRODUCT_CATEGORIES } from "queries/categories-queries";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { categorySelectors } from "utils/selectors";
// MUI
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown"
import Hidden from "@material-ui/core/Hidden";
// hooks
import Link from "next/link";
// Components
import CategoryBarDesktop from "./CategoryBarDesktop";
import CategoryBarMobile from "./CategoryBarMobile";



const CategoryBar: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const aClient = useApolloClient();
  const [categories, setCategories] = React.useState([]);
  const [expandCategories, setExpandCategories] = React.useState(false)

  const staticCategories = [
    "Flash Deals",
    "Design",
    "Web Templates",
    "How To",
    "Sounds",
    "Fonts",
    "Videos",
    "eBooks",
  ]

  React.useEffect(() => {
    if (categories.length < 1) {
      aClient.query<QueryData>({
        query: GET_PRODUCT_CATEGORIES
      }).then(({ data }) => {
        if (data && data.categories) {
          setCategories(data.categories)
        }
      }).catch(e => console.log("CategoryBar err: ", e))
    }
  }, [])

  return (
    <>
      <Hidden mdDown implementation="css">
        <CategoryBarDesktop
          categories={categories}
          staticCategories={staticCategories}
        />
      </Hidden>
      <Hidden lgUp implementation="css">
        <CategoryBarMobile
          categories={categories}
          staticCategories={staticCategories}
        />
      </Hidden>
    </>
  );
};



interface ReactProps extends WithStyles<typeof styles> {
}
interface QueryData {
  categories: ProductCategory[]
}

interface CategoriesExpandedProps {
  categories: ProductCategory[]
  expandCategories: boolean;
  hideExpandCategories(): void;
}

export default withStyles(styles)( CategoryBar );
