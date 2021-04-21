import React from 'react';
import clsx from "clsx";
// Global Checkout modal
// import CheckoutModal from "layout/Checkout";
// import ContactUsModal from "components/ContactUsModal";
import MySettingsModal from "layout/MySettingsModal";
// Chat
import BiddingRoom from "pageComponents/BiddingRoom";


const GlobalModals: React.FC<any> = (props) => {
  return (
    <>
      <MySettingsModal/>
      {/* <ChatCenterModal asModal/> */}
      {/* <CheckoutModal/> */}
      {/* <ContactUsModal/> */}
    </>
  )
};




export default GlobalModals;


