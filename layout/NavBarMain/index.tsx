import React from "react";
// Components
import NewsBar from "./NewsBar";
import MainBar from "./MainBar";
import { NewsBarHeight, MainBarHeight, NavBarHeight } from "layout/NavBarMain/styles";
import UserMenuMobileDither from "./UserMenuMobileDither";


const NavBar: React.FC<ReactProps> = (props) => {

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      <NewsBar/>
      <MainBar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      {/* <CategoryBar/> */}
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