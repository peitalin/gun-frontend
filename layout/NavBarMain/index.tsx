import React from "react";
// Components
import NewsBar from "./NewsBar";
import MainBar from "./MainBar";
import { NewsBarHeight, MainBarHeight, NavBarHeight } from "layout/NavBarMain/styles";



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
        <MenuDither
          setMobileMenuOpen={setMobileMenuOpen}
          // Dither must be outside of <MainBar/> -> <UserMenuMobile/>
          // which has position: absolute
          // Dither cannot have position absolute and zIndex above MainBar
        />
      }
    </>
  )
}

interface MenuDitherProps {
  setMobileMenuOpen(f: (s: boolean) => boolean): void;
}
const MenuDither = (props: MenuDitherProps) => (
  <div
    className={'fadeInFast'}
    style={{
      height: '100vh',
      width: '100vw',
      zIndex: 2, // above wishlist button which has zIndex: 1
      position: 'fixed',
      // top: `${NewsBarHeight + MainBarHeight}px`,
      top: 0,
      left: 0,
      backgroundColor: "rgba(47, 57, 65, .85)",
    }}
    onClick={() => props.setMobileMenuOpen(s => false)}
  >
  </div>
)

interface ReactProps {
}

export default NavBar;