import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Gradients, Colors, BoxShadows } from "layout/AppTheme";
// Material UI
import Dialog from "@material-ui/core/Dialog";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Components
import ProductCreatePage from "./ProductCreatePage";
import BannerProductCreate from "components/BannerProductCreate";
import { useScrollYPosition } from "utils/hooks";
// Router
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";




const ProductCreate: React.FC<ReactProps> = (props) => {

  const { classes, children } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className={classes.outerContainer}>
      <div className={classes.bannerOuter}>
        <BannerProductCreate/>
      </div>
      <div className={classes.flexRowInner}>
        <ProductCreatePage />
      </div>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) => createStyles({
  outerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    // backgroundColor: Colors.darkWhite,
  },
  bannerOuter: {
    position: 'relative',
    width: '100%',
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
    maxWidth: 1160,
    // width: '100%',
  },
});


export default withStyles(styles)( ProductCreate );
