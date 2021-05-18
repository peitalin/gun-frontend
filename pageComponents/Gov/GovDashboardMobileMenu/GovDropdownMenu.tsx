import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
// MUI
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown"
// hooks
import Link from "next/link";
import { useRouter } from "next/router";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const routeMappings = {
  'orders': "Profiles  -  Order Viewer",
  'users': "Profiles  -  User Viewer",
  'dealers': "Profiles  -  Dealer Viewer",

  'escrow/pending-approval': "Escrow  -  Pending Approval",
  'escrow/approved': "Escrow  -  Approved",
  'escrow/complete': "Escrow  -  Completed",
  'escrow/expiring': "Escrow  -  Expiring",
  'escrow/cancelled': "Escrow  -  Cancelled",

  'search': "Products  -  Search Index",
  'page-configs': "Configs  -  Initial Page Configs",
  'test-emails': "Test Tools  -  Test Emails",
}



const GovDropdownMenu: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const router = useRouter();
  const [expandMenu, setExpandMenu] = React.useState(false)

  const getRouteName = () => {

    const lastPath = router.pathname.split("/").pop()
    const secondLastPath = router.pathname.split("/").slice(-2,-1)[0]

    if (lastPath === "gov" || lastPath === "") {
      return "Home"
    } else {
      // // if p123123 id in route, take 2nd last part of route
      // if (lastPath.startsWith('orders') || lastPath.startsWith('[productId]')) {
      //   return "Edit Product"
      // }
      if (secondLastPath.startsWith("escrow")) {
        return "Escrow - " + lastPath.split('-').map(m => {
          //  otherwise change hyphens to spaces and capitalize
          return m.slice(0,1).toUpperCase() + m.slice(1)
        }).join(' ')
      }
      // otherwise return last part of route
      return lastPath.split('-').map(m => {
        //  otherwise change hyphens to spaces and capitalize
        return m.slice(0,1).toUpperCase() + m.slice(1)
      }).join(' ')
    }
  }

  return (
    <>
      <nav className={clsx(
        classes.baseBar,
        classes.dashboardBar,
      )}>
        <div className={classes.baseBarInner}>
          <div className={classes.dashboardBarInner}>
            <Typography variant="body1"
              onClick={() => setExpandMenu(x => !x)}
              className={clsx(
                classes.dashboardLinkTextMainHeight,
                classes.dashboardSelectedLink
              )}
            >
              {getRouteName()}
              <KeyboardArrowDown/>
            </Typography>
          </div>
        </div>
      </nav>
      <MenuExpanded
        expandMenu={expandMenu}
        hideExpandMenu={() => setExpandMenu(false)}
        {...props}
      />
    </>
  );
};


const MenuExpanded = (
  props: ReactProps & MenuExpandedProps
) => {

  const router = useRouter();
  const { classes } = props;

  return (
    <>
      <div className={clsx(
        props.expandMenu ? classes.expandMenu : null,
        classes.dashboardMenu
      )}>
        <div className={classes.mobileMenuRoutesRoot}>
          <div className={classes.dashboardOuterContainer}>
            <div className={classes.dashboardInnerContainer}>
              {
                Object.keys(routeMappings).map(k => {
                  let defaultRoute = '/gov/escrow/pending-approval'
                  return (
                    <div key={k} className={classes.mobileMenuFlexitem}>
                      <Link href={k.length ? `/gov/${k}` : defaultRoute}>
                        <a className={classes.menuLink}>
                          <MenuItem
                            className={clsx(
                              classes.mobileMenuFlexitem,
                              classes.mobileMenuItemRoot
                            )}
                            onClick={props.hideExpandMenu}
                          >
                            <Typography className={classes.mobileMenuItemText}>
                              {routeMappings[k]}
                            </Typography>
                          </MenuItem>
                        </a>
                      </Link>
                    </div>
                  )
                })
              }
            </div>

          </div>
        </div>
      </div>
      {
        props.expandMenu &&
        <MenuDither {...props}/>
      }
    </>
  )
}


const MenuDither = (props: ReactProps & MenuExpandedProps) => (
  <div
    className={clsx(props.classes.dashboardMenuDither, 'fadeInFast')}
    onClick={props.hideExpandMenu}
  >
  </div>
)


interface ReactProps extends WithStyles<typeof styles> {
}

interface MenuExpandedProps {
  expandMenu: boolean;
  hideExpandMenu(): void;
}

export default withStyles(styles)( GovDropdownMenu );
