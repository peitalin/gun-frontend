import React from 'react';
import clsx from "clsx";
import Header from "./Header";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Components
import dynamic from "next/dynamic";
// import Footer from "./Footer";
const Footer = dynamic(
  () => import("./Footer"), {
    loading: () => <div className={"footer"}/>,
    ssr: false,
  }
)
import NavBarMain from "./NavBarMain";
import GetUser from "./GetUser";
import GlobalModals from "./GlobalModals";
// Router
import { useRouter } from "next/router";
import PageContainer from "layout/PageContainer";



const Layout: React.FC<ReactProps> = (props) => {

  const router = useRouter();

  let showChatWoot = (
    router.pathname === "/home"
    || router.pathname.startsWith("/p/")
    || router.pathname === "/sell"
    || router.pathname === "/orders"
  ) ? true : false

  let noNavbarPadding = router.pathname === "/home"
    || router.pathname === "/start"
    || router.pathname === "/sell"
    || router.pathname.startsWith("/f/")

  return (
    <>
      <Header showChatwoot={showChatWoot} />
      <NavBarMain />
      <GlobalModals/>
      <GetUser/>
      <PageContainer needsNavbarPadding={!noNavbarPadding}>
        {props.children}
      </PageContainer>
      <Footer/>
    </>
  )
};




interface ReactProps {
}

export default Layout


