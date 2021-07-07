import React from "react";
// Components
// import NewsBar from "./NewsBar";
import CategoryBar from "./CategoryBar";
import MainBar from "./MainBar";
import UserMenuMobileDither from "./UserMenuMobileDither";
import { Categories } from "typings/gqlTypes";
import { categoryPreviewsBackup } from "components/CategoryCarouselStart/utils";


const NavBar: React.FC<ReactProps> = (props) => {

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  let initialCategories: Categories[] = categoryPreviewsBackup as any

  return (
    <>
      {/* <NewsBar/> */}
      <MainBar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <CategoryBar
        initialCategories={initialCategories}
      />
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

export default NavBar;