import React from "react";
// Components
// import NewsBar from "./NewsBar";
import CategoryBarMobile from "./CategoryBar/CategoryBarMobile";
import MainBar from "./MainBar";
import UserMenuMobileDither from "./UserMenuMobileDither";
import NotificationsIcon from '@mui/icons-material/Notifications';
// Redux
import { GrandReduxState } from 'reduxStore/grand-reducer';
import { useDispatch, useSelector } from "react-redux";

import Hidden from "components/HiddenFix";
import { Categories, UserPrivate } from "typings/gqlTypes";
import { useRouter, NextRouter } from "next/router";
import { categoryPreviewsBackup } from "utils/categories";
import {
  isFeaturedPageFn,
  isMainPageFn,
  isSellPageFn,
  isStartPageFn,
  isDashboardPageFn,
} from "./MainBar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


const NavBar: React.FC<ReactProps> = (props) => {

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const {
    user,
  } = useSelector<GrandReduxState, ReduxProps>(state => ({
    user: state?.reduxLogin?.user,
  }));

  const router = useRouter()

  let initialCategories: Categories[] = categoryPreviewsBackup as any

  let _isMainPage = isMainPageFn(router)
  let _isSellPage = isSellPageFn(router)
  let _isStartPage = isStartPageFn(router)
  let _isFeaturedPage = isFeaturedPageFn(router)
  let _isDashboardPage = isDashboardPageFn(router)

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      {/* <NewsBar/> */}
      <MainBar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        isMainPage={_isMainPage}
        isStartPage={_isStartPage}
        isSellPage={_isSellPage}
        isFeaturedPage={_isFeaturedPage}
        isDashboardPage={_isDashboardPage}
        user={user}
        isMobile={mdDown}
      />

      <Hidden xlUp implementation="css">
        <CategoryBarMobile
          categories={initialCategories}
          isMainPage={_isMainPage}
          isStartPage={_isStartPage}
          isSellPage={_isSellPage}
          isFeaturedPage={_isFeaturedPage}
          user={user}
        />
      </Hidden>

      {
        mobileMenuOpen &&
        <UserMenuMobileDither
          // className={classes.zIndex6}
          setMobileMenuOpen={setMobileMenuOpen}
          // Dither must be outside of <MainBar/> -> <UserMenuMobile/>
          // which has position: absolute
          // Dither cannot have position absolute and zIndex above MainBar
        />
      }
    </>
  )
}

interface ReactProps {
}
interface ReduxProps {
  user: UserPrivate;
}


export default NavBar;