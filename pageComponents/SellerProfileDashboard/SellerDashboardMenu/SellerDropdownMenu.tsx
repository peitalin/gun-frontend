import React from "react";
import { oc as option } from "ts-optchain";
import { Product } from "typings/gqlTypes";
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
  '': "Home",
  'published-products': "My Products",
  'unpublished-products': "My Unpublished Products",
  'sales': "My Sales",
  'payouts': "Payouts",
  'promo-codes': "Promo Codes",
}



const SellerDashboardRoutes: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const router = useRouter();
  const [expandMenu, setExpandMenu] = React.useState(false)

  const getRouteName = () => {

    const lastPath = router.pathname.split("/").pop()
    const secondLastPath = router.pathname.split("/").slice(-2,-1)[0]

    if (lastPath === "seller" || lastPath === "") {
      return "My Products"
    } else {
      // if p123123 id in route, take 2nd last part of route
      if (lastPath.startsWith('p') || lastPath.startsWith('[productId]')) {
        return "Edit Product"
      }
      if (lastPath.startsWith('order') || lastPath.startsWith('[orderItemId]')) {
        return "View Order Details"
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
        <div className={classes.dashboardOuterContainer}>
          <div className={classes.dashboardInnerContainer}>
            {
              Object.keys(routeMappings).map(k => {
                return (
                  <Link key={k}
                    href={
                      k.length
                        ? `/seller/${k}`
                        : '/seller'
                    }
                  >
                    <a className={classes.dashboardLink}>
                      <MenuItem
                        className={classes.menuItem}
                        onClick={props.hideExpandMenu}
                      >
                        <Typography className={classes.dashboardLinkText}>
                          {routeMappings[k]}
                        </Typography>
                      </MenuItem>
                    </a>
                  </Link>
                )
              })
            }
            <div className={classes.buttonCreateProductContainer}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.buttonCreateProduct}
                onClick={() => {
                  router.push("/create-product")
                }}
              >
                Upload Product
              </Button>
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

export default withStyles(styles)( SellerDashboardRoutes );
