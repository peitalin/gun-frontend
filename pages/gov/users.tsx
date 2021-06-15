import React from "react";
// SSR
import { NextPage, NextPageContext } from 'next';
import LoadingBarSSR from "components/LoadingBarSSR";
// SSR disable
import dynamic from "next/dynamic";
import { AdminProfileProps } from "layout/GetUser/AdminProfileWrapper";
const AdminProfileWrapper = dynamic(() => import("layout/GetUser/AdminProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
import UserViewerPage from "pageComponents/Gov/UserViewer";



const GovUsersPage: NextPage<ReactProps> = (props) => {

  return (
    <AdminProfileWrapper>
      {({ data, loading, error }: AdminProfileProps) => {
        return (
          <UserViewerPage
            onSubmit={undefined}
            onClickDebugPrint={undefined}
          />
        )
      }}
    </AdminProfileWrapper>
  )
}


///////////////// TYPINGS ///////////////////
interface ReactProps {
}

export const getStaticProps = async (context) => {
  return { props: { } };
};

export default GovUsersPage






