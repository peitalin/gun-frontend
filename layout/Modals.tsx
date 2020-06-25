import React from 'react';
import clsx from "clsx";
import { oc as option } from "ts-optchain";
// Global Checkout modal
// import CheckoutModal from "layout/Checkout";
// import GiftDownloadModal from "components/GiftDownloadModal";
// import ShareLinkModal from "components/ShareLinkModal";
// import ContactUsModal from "components/ContactUsModal";
import MySettingsModal from "layout/MySettingsModal";
// Chat
import ChatCenterModal from "pageComponents/ChatCenter";


const Modals: React.FC<any> = (props) => {
  return (
    <>
      <MySettingsModal/>
      <ChatCenterModal asModal/>
      {/* <CheckoutModal/>
      <GiftDownloadModal/> */}
      {/* <ShareLinkModal/>
      <ContactUsModal/> */}
    </>
  )
};




export default Modals;


