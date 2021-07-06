import React from "react";
// Components
// import NewsBar from "./NewsBar";
import CategoryBar from "./CategoryBar";
import MainBar from "./MainBar";
import UserMenuMobileDither from "./UserMenuMobileDither";
import { Categories } from "typings/gqlTypes";



const NavBar: React.FC<ReactProps> = (props) => {

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      {/* <NewsBar/> */}
      <MainBar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      {
        props.initialCategories?.length > 0 &&
        <CategoryBar
          initialCategories={props.initialCategories}
        />
      }
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
  initialCategories: Categories[]
}

export default NavBar;