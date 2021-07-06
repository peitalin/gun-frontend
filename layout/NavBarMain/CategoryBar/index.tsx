import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import Hidden from "components/HiddenFix";
// Components
import CategoryBarDesktop from "./CategoryBarDesktop";
import CategoryBarMobile from "./CategoryBarMobile";
import { Categories } from "typings/gqlTypes";
import {
  isFeaturedPageFn,
  isMainPageFn,
  isSellPageFn,
  isStartPageFn,
} from "../MainBar";
import { useRouter, NextRouter } from "next/router";



const CategoryBar: React.FC<ReactProps> = (props) => {

  const router = useRouter()

  let _isMainPage = isMainPageFn(router)
  let _isSellPage = isSellPageFn(router)
  let _isStartPage = isStartPageFn(router)
  let _isFeaturedPage = isFeaturedPageFn(router)


  return (
    <nav className={props.className}>
      <Hidden mdDown implementation="css">
        <CategoryBarDesktop
          categories={props.initialCategories}
          isMainPage={_isMainPage}
          isStartPage={_isStartPage}
          isSellPage={_isSellPage}
          isFeaturedPage={_isFeaturedPage}
          isMobile={false}
        />
      </Hidden>
      <Hidden lgUp implementation="css">
        <CategoryBarMobile
          categories={props.initialCategories}
          isMainPage={_isMainPage}
          isStartPage={_isStartPage}
          isSellPage={_isSellPage}
          isFeaturedPage={_isFeaturedPage}
          isMobile={true}
        />
      </Hidden>
    </nav>
  );
};



interface ReactProps extends WithStyles<typeof styles> {
  className?: any;
  initialCategories: Categories[]
}

export default withStyles(styles)( CategoryBar );
