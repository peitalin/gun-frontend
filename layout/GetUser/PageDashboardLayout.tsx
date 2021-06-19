import React from 'react';
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Components
import { NavBarHeight } from "layout/NavBarMain/styles";
// Typings
import { UserPrivate } from "typings/gqlTypes";
import ErrorBounds from "components/ErrorBounds";
import { Colors, Gradients } from "layout/AppTheme";
//
import SellersSideRoutesMenu from "pageComponents/SellerDashboard/SellersSideRoutesMenu";
import SellerDashboardMobileMenu from "pageComponents/SellerDashboard/SellerDashboardMobileMenu";
//
import GovSideRoutesMenu from "pageComponents/Gov/GovSideRoutesMenu";
import GovDashboardMobileMenu from "pageComponents/Gov/GovDashboardMobileMenu";

import DealersSideRoutesMenu from "pageComponents/DealerDashboard/DealersSideRoutesMenu";
import DealerDashboardMobileMenu from "pageComponents/DealerDashboard/DealerDashboardMobileMenu";

import HelpSideRoutesMenu from "pageComponents/Help/HelpSideRoutesMenu";
import HelpDashboardMobileMenu from "pageComponents/Help/HelpDashboardMobileMenu";
// Router
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";



const PageDashboardLayout: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const router = useRouter();
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  );

  const isSellerRoute = !!router.pathname.includes('/admin')
    && !!user?.store?.id
  const isGovernanceRoute = !!router.pathname.startsWith('/gov')
  const isDealerRoute = !!router.pathname.startsWith('/dealers')
  const isHelpRoute = !!router.pathname.startsWith('/help')

  const renderRoleMenuDesktop = (user: UserPrivate) => {
    if (isSellerRoute) {
      return <SellersSideRoutesMenu user={user} />
    } else if (isGovernanceRoute) {
      return <GovSideRoutesMenu user={user} />
    } else if (isDealerRoute) {
      return <DealersSideRoutesMenu user={user} />
    } else if (isHelpRoute) {
      return <HelpSideRoutesMenu/>
    } else {
      return <></>
    }
  }

  const renderRoleMenuMobile = (user: UserPrivate) => {
    if (isSellerRoute) {
      return <SellerDashboardMobileMenu storePrivate={user.store} />
    } else if (isGovernanceRoute) {
      return <GovDashboardMobileMenu/>
    } else if (isDealerRoute) {
      return <DealerDashboardMobileMenu user={user}/>
    } else if (isHelpRoute) {
      return <HelpDashboardMobileMenu />
    } else {
      return <></>
    }
  }

  if (!lgDown) {
    // desktop
    return (
      <ErrorBounds className={classes.flexJustify}>
        <div className={clsx(classes.dashboardContainer)}>
          <div className={classes.minWidth240}>
            { renderRoleMenuDesktop(user) }
          </div>
          <div className={classes.flex75}>
            {props.children}
          </div>
        </div>
      </ErrorBounds>
    )
  } else {
    // mobile
    return (
      <ErrorBounds className={clsx(classes.dashboardContainer)}>
        <div className={classes.dashboardInnerContainerMobile}>
          { renderRoleMenuMobile(user) }
          {props.children}
        </div>
      </ErrorBounds>
    )
  }
};



interface ReactProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) => createStyles({
  dashboardInnerContainerMobile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: '3rem', // account for dropdown mobileMenu bar
  },
  flexJustify: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "center",
  },
  dashboardContainer: {
    position: 'relative',
    minHeight: `calc(100vh - ${NavBarHeight}px)`,
    maxWidth: 1200,
    width: '100%',
    opacity: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    // background: Gradients.gradientUniswapDark.background,
  },
  minWidth240: {
    width: 240,
  },
  flex75: {
    width: 'calc(100% - 240px)',
    flexGrow: 1,
  },
});

export default withStyles(styles)( PageDashboardLayout );


