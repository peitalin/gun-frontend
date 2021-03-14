import React from 'react';
import clsx from "clsx";
// Global Checkout modal
// import CheckoutModal from "layout/Checkout";
// import ContactUsModal from "components/ContactUsModal";
import MySettingsModal from "layout/MySettingsModal";
// Chat
import ChatCenterModal from "pageComponents/ChatCenter";


const Modals: React.FC<any> = (props) => {
  return (
    <>
      <MySettingsModal/>
      <ChatCenterModal asModal/>
      {/* <CheckoutModal/> */}
      {/* <ContactUsModal/> */}
    </>
  )
};




export default Modals;


