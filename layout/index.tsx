import React from 'react';
import clsx from "clsx";
import Header from "./Header";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Components
import NavBarMain from "./NavBarMain";
import Footer from "./Footer";
import GetUser from "./GetUser";
import GlobalModals from "./GlobalModals";
// Router
import { useRouter } from "next/router";
import { Categories } from "typings/gqlTypes";
import PageContainer from "layout/PageContainer";



const Layout: React.FC<ReactProps> = (props) => {

  const router = useRouter();

  let showChatWoot = (
    router.pathname === "/"
    || router.pathname.startsWith("/p/")
    || router.pathname === "/sell"
    || router.pathname === "/orders"
  ) ? true : false

  // console.log("showChatWood: ", showChatWoot)
  let showSocialBanner = router.pathname === '/'
    || router.pathname.startsWith("/start")
    || router.pathname.startsWith("/help")

  let noNavbarPadding = router.pathname === "/"
    || router.pathname === "/start"
    || router.pathname === "/sell"
    || router.pathname.startsWith("/f/")

  return (
    <>
      <Header showChatwoot={showChatWoot} />
      <NavBarMain
        initialCategories={props.initialCategories}
      />
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
  initialCategories: Categories[]
}

export default Layout


