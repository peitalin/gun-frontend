import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import Hidden from "components/HiddenFix";
// Components
import CategoryBarDesktop from "./CategoryBarDesktop";
import CategoryBarMobile from "./CategoryBarMobile";
import { Categories, UserPrivate } from "typings/gqlTypes";
import {
  isFeaturedPageFn,
  isMainPageFn,
  isSellPageFn,
  isStartPageFn,
} from "../MainBar";
import { useRouter, NextRouter } from "next/router";
import { categoryPreviewsBackup } from "utils/categories";



const CategoryBar: React.FC<ReactProps> = (props) => {

  const router = useRouter()

  let _isMainPage = isMainPageFn(router)
  let _isSellPage = isSellPageFn(router)
  let _isStartPage = isStartPageFn(router)
  let _isFeaturedPage = isFeaturedPageFn(router)

  let initialCategories: Categories[] = categoryPreviewsBackup as any

  return (
    <nav className={props.className}>
      {
        props.mobile
        ? <Hidden xlUp implementation="css">
            <CategoryBarMobile
              categories={initialCategories}
              isMainPage={_isMainPage}
              isStartPage={_isStartPage}
              isSellPage={_isSellPage}
              isFeaturedPage={_isFeaturedPage}
              user={props.user}
            />
          </Hidden>
        : <Hidden lgDown implementation="css">
          <CategoryBarDesktop
            categories={initialCategories}
            isMainPage={_isMainPage}
            isStartPage={_isStartPage}
            isSellPage={_isSellPage}
            isFeaturedPage={_isFeaturedPage}
            user={props.user}
          />
        </Hidden>
      }
    </nav>
  );
};



interface ReactProps extends WithStyles<typeof styles> {
  className?: any;
  mobile?: boolean
  user: UserPrivate;
}

export default withStyles(styles)( CategoryBar );
