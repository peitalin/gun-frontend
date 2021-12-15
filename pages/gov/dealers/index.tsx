import React from "react";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import { styles } from "pageComponents/DealerDashboard/styles";
import clsx from "clsx";
// Typings
import { UserPrivate } from "typings/gqlTypes";
// Components
import Loading from "components/Loading";
import LoadingBarSSR from "components/LoadingBarSSR";
import Button from "@mui/material/Button";
// next
// SSR disable
import dynamic from "next/dynamic";
const CreateDealerProfile = dynamic(
  () => import("pageComponents/Gov/CreateDealerProfile"), {
    loading: () => <Loading />,
    ssr: false,
  }
)
// const DealerViewer = dynamic(
//   () => import("pageComponents/Gov/DealerViewer"), {
//     loading: () => <Loading />,
//     ssr: false,
//   }
// )
import DealerViewer from "pageComponents/Gov/DealerViewer";
import { AdminProfileProps } from "layout/GetUser/AdminProfileWrapper";
const AdminProfileWrapper = dynamic(() => import("layout/GetUser/AdminProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";




const CreateDealerHomepage = (props: ReactProps) => {

  // state
  const { classes } = props;
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <>
      <MetaHeadersPage
        title="Create Dealer Profile - gunmarketplace.com.au"
        robots="noindex"
      />
      <AdminProfileWrapper>
      {({ data, loading, error }: AdminProfileProps) => {
        return (
          <div className={classes.contentContainer}>
            {
              menuOpen
              ? <div className={clsx(classes.flexRow, classes.width100)}>
                  <CreateDealerProfile
                    setMenuOpen={setMenuOpen}
                    user={data?.user}
                  />
                </div>
              : <div className={clsx(classes.flexRow, classes.width100)}>
                  <Button
                    className={classes.openCreateDealerButton}
                    classes={{
                      label: classes.openCreateDealerButtonLabel
                    }}
                    onClick={() => setMenuOpen(s => !s)}
                  >
                    Create New Dealer
                  </Button>
                </div>
            }
            <div style={{ margin: '1rem' }}></div>
            <DealerViewer />
          </div>
        );
      }}
      </AdminProfileWrapper>
    </>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}

export const getStaticProps = async (context) => {
  return { props: { } };
};

export default withStyles(styles)( CreateDealerHomepage );


