import React from "react";
import { useState } from "react";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Material UI
import Dialog from "@material-ui/core/Dialog";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Typings
import { ID, ProductCreateInput, Product, Connection } from "typings/gqlTypes";
// Components
import ProductCreatePage from "pageComponents/ProductCreate";
import BannerProductCreate from "components/BannerProductCreate";
// Router
import { useWindowWidth } from "utils/hooks";
import { Colors } from "layout/AppTheme";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";




const SellPageSSR: React.FC<ProductCreateProps> = (props) => {

  return (
    <>
      <MetaHeadersPage
        title="Sell Used Guns - List for Free | Gun Marketplace"
        description="List and sell guns online"
      />
      {/* <BannerProductCreate/> */}
      <ProductCreatePage
        asModal={false}
      />
      {/* <div className={classes.outerContainer}>
        <div className={classes.bannerOuter}>
          <BannerProductCreate/>
        </div>
        <div className={classes.flexRow}>
          <div className={classes.flexRowInner}>
            <ProductCreatePage
              asModal={false}
              closeModal={closeModal}
            />
          </div>
        </div>
      </div> */}
    </>
  )
}

type ProductCreateProps = ReactProps;

interface ReactProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) => createStyles({
  fullMaxHeight: {
    maxHeight: "100%",
    width: '100%',
  },
  outerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  flexRowInner: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 1024,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  bannerOuter: {
    position: 'relative',
    width: '100%',
  },
  bannerInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
});


export default withStyles(styles)( SellPageSSR );
