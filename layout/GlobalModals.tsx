import React from 'react';
// import ContactUsModal from "components/ContactUsModal";
import CollectionsModal from "components/CollectionsModal";
// import MySettingsModal from "layout/MySettingsModal";


const GlobalModals: React.FC<any> = (props) => {
  return (
    <>
      {/* <MySettingsModal/> */}
      <CollectionsModal/>
      {/* <ContactUsModal/> */}
    </>
  )
};




export default GlobalModals;


